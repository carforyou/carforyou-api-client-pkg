import { sendMessageLead } from "../messageLead"

describe("Car API", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe("#messageLead", () => {
    describe("valid parematers", () => {
      const messageLead = {
        name: "Test",
        phone: "+41781234567",
        email: "test@test.com",
        message: "This is a message of a interested customer"
      }

      beforeEach(() => {
        fetchMock.mockResponse("")
      })

      describe("validate only", () => {
        it("calls validation endpoint", async () => {
          await sendMessageLead(12345, messageLead, {
            validateOnly: true
          })

          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(
              /\/listings\/12345\/message-leads\/validate$/
            ),
            expect.any(Object)
          )
        })

        it("returns a success", async () => {
          const result = await sendMessageLead(12345, messageLead, {
            validateOnly: true
          })

          expect(result).toEqual({ tag: "success", result: messageLead })
        })
      })

      describe("submit", () => {
        it("calls submission endpoint", async () => {
          await sendMessageLead(12345, messageLead)

          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/\/listings\/12345\/message-leads$/),
            expect.any(Object)
          )
        })

        it("sends recaptcha token in a header", async () => {
          await sendMessageLead(12345, messageLead, {
            recaptchaToken: "token"
          })

          expect(fetch).toHaveBeenCalledWith(expect.any(String), {
            headers: expect.objectContaining({
              "Recaptcha-Token": "token"
            }),
            body: expect.any(String),
            method: "POST"
          })
        })

        it("returns a success", async () => {
          const result = await sendMessageLead(12345, messageLead)

          expect(result).toEqual({ tag: "success", result: messageLead })
        })
      })
    })

    describe("invalid parameters", () => {
      const errors = [{ param: "email", error: "validations.invalid-format" }]
      const messageLead = {
        name: "Test",
        phone: "+41781234567",
        email: "test@test",
        message: "This is a message of a interested customer"
      }

      beforeEach(() => {
        fetchMock.mockResponse(
          JSON.stringify({ errors, message: "validations.not-valid" }),
          {
            status: 400
          }
        )
      })

      it("returns a failure", async () => {
        const result = await sendMessageLead(12345, messageLead)

        expect(result.tag).toEqual("error")
        if (result.tag === "error") {
          expect(result.errors).toEqual(errors)
          expect(result.message).toEqual("validations.not-valid")
        }
      })
    })

    describe("other error", () => {
      const messageLead = {
        name: "Test",
        phone: "+41781234567",
        email: "test@test",
        message: "This is a message of a interested customer"
      }

      beforeEach(() => {
        fetchMock.mockResponse("", {
          status: 500
        })
      })

      it("returns a failure", async () => {
        const result = await sendMessageLead(12345, messageLead)

        expect(result.tag).toEqual("error")
        if (result.tag === "error") {
          expect(result.message).toEqual("validation.other-error")
        }
      })
    })
  })
})
