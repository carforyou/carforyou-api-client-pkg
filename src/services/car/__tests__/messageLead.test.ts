import { sendMessageLead } from "../messageLead"

describe("Car API", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const messageLead = (attributes = {}) => ({
    language: "de",
    firstName: "Test firstname",
    lastName: "Test lastname",
    phone: "+41781234567",
    email: "test@test.com",
    message: "This is a message of a interested customer",
    videoCallPreference: {
      available: true,
      services: [],
      otherService: "some other cool video provider",
    },
    ...attributes,
  })

  describe("#messageLead", () => {
    it("merges otherService into services in videoCallPreference", async () => {
      await sendMessageLead({ listingId: 12345, messageLead: messageLead() })

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({
            language: "de",
            firstName: "Test firstname",
            lastName: "Test lastname",
            phone: "+41781234567",
            email: "test@test.com",
            message: "This is a message of a interested customer",
            videoCallPreference: {
              available: true,
              services: ["some other cool video provider"],
            },
          }),
        })
      )
    })

    it("calls api v2", async () => {
      await sendMessageLead({ listingId: 12345, messageLead: messageLead() })

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Accept: "application/vnd.carforyou.v2+json",
          }),
        })
      )
    })

    describe("valid parameters", () => {
      beforeEach(() => {
        fetchMock.mockResponse("")
      })

      describe("validate only", () => {
        it("calls validation endpoint", async () => {
          await sendMessageLead({
            listingId: 12345,
            messageLead: messageLead(),
            options: {
              validateOnly: true,
            },
          })

          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(
              /\/listings\/12345\/message-leads\/validate$/
            ),
            expect.any(Object)
          )
        })

        it("returns a success", async () => {
          const result = await sendMessageLead({
            listingId: 12345,
            messageLead: messageLead(),
            options: {
              validateOnly: true,
            },
          })

          expect(result).toEqual({ tag: "success", result: messageLead() })
        })
      })

      describe("submit", () => {
        it("calls submission endpoint", async () => {
          await sendMessageLead({
            listingId: 12345,
            messageLead: messageLead(),
          })

          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/\/listings\/12345\/message-leads$/),
            expect.any(Object)
          )
        })

        it("returns a success", async () => {
          const result = await sendMessageLead({
            listingId: 12345,
            messageLead: messageLead(),
          })

          expect(result).toEqual({ tag: "success", result: messageLead() })
        })
      })
    })

    describe("invalid parameters", () => {
      const errors = [{ param: "email", error: "validations.invalid-format" }]

      beforeEach(() => {
        fetchMock.mockResponse(
          JSON.stringify({ errors, message: "validations.not-valid" }),
          {
            status: 400,
          }
        )
      })

      it("returns a failure", async () => {
        const result = await sendMessageLead({
          listingId: 12345,
          messageLead: messageLead({ email: "test@test" }),
        })

        expect(result.tag).toEqual("error")
        if (result.tag === "error") {
          expect(result.errors).toEqual(errors)
          expect(result.message).toEqual("validations.not-valid")
        }
      })
    })

    describe("other error", () => {
      beforeEach(() => {
        fetchMock.mockResponse("", {
          status: 500,
        })
      })

      it("returns a failure", async () => {
        const result = await sendMessageLead({
          listingId: 12345,
          messageLead: messageLead(),
        })

        expect(result.tag).toEqual("error")
        if (result.tag === "error") {
          expect(result.message).toEqual("validation.other-error")
        }
      })
    })
  })
})
