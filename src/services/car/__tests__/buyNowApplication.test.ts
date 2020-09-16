import { sendBuyNowApplication } from "../buyNowApplication"

describe("Car API", () => {
  beforeEach(fetchMock.resetMocks)

  const buyNowApplication = (attributes = {}) => ({
    firstName: "Tester",
    lastName: "Test",
    address: "Test str. 42",
    zipCode: "8042",
    city: "Test city",
    email: "test@test.com",
    language: "de",
    phone: "+4178123456",
    generalTermsAndConditionsConfirmation: true,
    onlinePurchaseTermsAndConditionsConfirmation: false,
    ...attributes,
  })

  describe("#sendBuyNowApplication", () => {
    beforeEach(() => {
      fetchMock.mockResponse("")
    })

    it("calls submission endpoint", async () => {
      await sendBuyNowApplication(12345, buyNowApplication())

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/listings\/12345\/buy-now-applications$/),
        expect.any(Object)
      )
    })

    it("calls validation endpoint when requested", async () => {
      await sendBuyNowApplication(12345, buyNowApplication(), {
        validateOnly: true,
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/listings\/12345\/buy-now-applications\/validate$/
        ),
        expect.any(Object)
      )
    })

    it("sends recaptcha token in a header", async () => {
      await sendBuyNowApplication(12345, buyNowApplication(), {
        recaptchaToken: "token",
      })

      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        headers: expect.objectContaining({
          "Recaptcha-Token": "token",
        }),
        body: expect.any(String),
        method: "POST",
      })
    })

    describe("valid parameters", () => {
      it("returns a success", async () => {
        const result = await sendBuyNowApplication(12345, buyNowApplication())

        expect(result).toEqual({ tag: "success", result: buyNowApplication() })
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

      it("returns validation error", async () => {
        const result = await sendBuyNowApplication(
          12345,
          buyNowApplication({ email: "test@test" })
        )

        expect(result.tag).toEqual("error")
        if (result.tag === "error") {
          expect(result.errors).toEqual(errors)
          expect(result.message).toEqual("validations.not-valid")
        }
      })
    })
  })
})
