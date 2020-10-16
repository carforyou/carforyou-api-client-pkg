import { fetchLeasingFormUrl, sendLeasingInterest } from "../leasing"

describe("CAR service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchLeasingFormUrl", () => {
    it("returns the url", async () => {
      fetchMock.mockResponse(JSON.stringify({ url: "test-url" }))

      expect(
        await fetchLeasingFormUrl({ listingId: 123, language: "de" })
      ).toEqual("test-url")
    })

    it("returns null if listing fails validation rules", async () => {
      fetchMock.mockResponse(JSON.stringify({ message: "too expensive" }), {
        status: 422,
      })

      expect(
        await fetchLeasingFormUrl({ listingId: 123, language: "de" })
      ).toEqual(null)
    })

    it("sends recaptcha token in a header", async () => {
      fetchMock.mockResponse(JSON.stringify({ url: "test-url" }))

      await fetchLeasingFormUrl({
        listingId: 123,
        language: "de",
        options: {
          recaptchaToken: "token",
        },
      })

      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        headers: expect.objectContaining({
          "Recaptcha-Token": "token",
        }),
        body: expect.any(String),
        method: "POST",
      })
    })
  })

  describe("sendLeasingInterest", () => {
    const leasingInterest = (attributes = {}) => ({
      name: "Test",
      phone: "+41781234567",
      email: "test@test.com",
      message: "This is a message of a interested customer",
      ...attributes,
    })

    describe("valid parameters", () => {
      beforeEach(() => {
        fetchMock.mockResponse("")
      })

      describe("validate only", () => {
        it("calls validation endpoint", async () => {
          await sendLeasingInterest({
            listingId: 12345,
            leasingInterest: leasingInterest(),
            options: {
              validateOnly: true,
            },
          })

          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(
              /\/listings\/12345\/leasing\/interests\/validate$/
            ),
            expect.any(Object)
          )
        })

        it("returns a success", async () => {
          const result = await sendLeasingInterest({
            listingId: 12345,
            leasingInterest: leasingInterest(),
            options: {
              validateOnly: true,
            },
          })

          expect(result).toEqual({ tag: "success", result: leasingInterest() })
        })
      })

      describe("submit", () => {
        it("calls submission endpoint", async () => {
          await sendLeasingInterest({
            listingId: 12345,
            leasingInterest: leasingInterest(),
          })

          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/\/listings\/12345\/leasing\/interests$/),
            expect.any(Object)
          )
        })

        it("sends recaptcha token in a header", async () => {
          await sendLeasingInterest({
            listingId: 12345,
            leasingInterest: leasingInterest(),
            options: {
              recaptchaToken: "token",
            },
          })

          expect(fetch).toHaveBeenCalledWith(expect.any(String), {
            headers: expect.objectContaining({
              "Recaptcha-Token": "token",
            }),
            body: expect.any(String),
            method: "POST",
          })
        })

        it("returns a success", async () => {
          const result = await sendLeasingInterest({
            listingId: 12345,
            leasingInterest: leasingInterest(),
          })

          expect(result).toEqual({ tag: "success", result: leasingInterest() })
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
        const result = await sendLeasingInterest({
          listingId: 12345,
          leasingInterest: leasingInterest({ email: "test@test" }),
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
        const result = await sendLeasingInterest({
          listingId: 12345,
          leasingInterest: leasingInterest(),
        })

        expect(result.tag).toEqual("error")
        if (result.tag === "error") {
          expect(result.message).toEqual("validation.other-error")
        }
      })
    })
  })
})
