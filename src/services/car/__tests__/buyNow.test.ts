import { fetchBuyNowConfiguration, sendBuyNowApplication } from "../buyNow"

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
      await sendBuyNowApplication({
        listingId: 12345,
        buyNowApplication: buyNowApplication(),
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/listings\/12345\/buy-now-applications$/),
        expect.any(Object)
      )
    })

    it("calls validation endpoint when requested", async () => {
      await sendBuyNowApplication({
        listingId: 12345,
        buyNowApplication: buyNowApplication(),
        options: { validateOnly: true },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/listings\/12345\/buy-now-applications\/validate$/
        ),
        expect.any(Object)
      )
    })

    describe("valid parameters", () => {
      it("returns a success", async () => {
        const result = await sendBuyNowApplication({
          listingId: 12345,
          buyNowApplication: buyNowApplication(),
        })

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
        const result = await sendBuyNowApplication({
          listingId: 12345,
          buyNowApplication: buyNowApplication({ email: "test@test" }),
        })

        expect(result.tag).toEqual("error")
        if (result.tag === "error") {
          expect(result.errors).toEqual(errors)
          expect(result.message).toEqual("validations.not-valid")
        }
      })
    })
  })

  describe("fetchBuyNowConfiguration", () => {
    it("fetches the data", async () => {
      const config = {
        paymentAvailable: true,
      }
      fetchMock.mockResponse(JSON.stringify(config))

      const data = await fetchBuyNowConfiguration({ dealerId: 1 })
      expect(data).toEqual(config)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
