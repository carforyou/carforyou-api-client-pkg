import { sendBuyerProtectionApplication } from "../buyerProtection"

describe("#sendBuyerProtectionApplication", () => {
  const buyerProtectionEntry = (attributes = {}) => ({
    firstName: "Tester",
    lastName: "Test",
    email: "test@test.com",
    language: "de",
    phone: "+4178123456",
    purchaseDate: "2021-10-18",
    licensePlate: "abc123",
    ...attributes,
  })

  const mockResponse = buyerProtectionEntry()
  beforeEach(() => {
    fetchMock.mockResponse(JSON.stringify(mockResponse))
  })

  it("calls submission endpoint", async () => {
    await sendBuyerProtectionApplication({
      listingId: 12345,
      buyerProtectionApplication: buyerProtectionEntry(),
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(
        /\/listings\/12345\/buyer-protection-applications$/
      ),
      expect.any(Object)
    )
  })

  it("calls validation endpoint when requested", async () => {
    await sendBuyerProtectionApplication({
      listingId: 12345,
      buyerProtectionApplication: buyerProtectionEntry(),
      options: { validateOnly: true },
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(
        /\/listings\/12345\/buyer-protection-applications$/
      ),
      expect.any(Object)
    )
  })

  describe("valid parameters", () => {
    it("returns a success", async () => {
      const result = await sendBuyerProtectionApplication({
        listingId: 12345,
        buyerProtectionApplication: buyerProtectionEntry(),
      })

      expect(result).toEqual({
        tag: "success",
        result: buyerProtectionEntry(),
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

    it("returns validation error", async () => {
      const result = await sendBuyerProtectionApplication({
        listingId: 12345,
        buyerProtectionApplication: buyerProtectionEntry({
          email: "test@test",
        }),
      })

      expect(result.tag).toEqual("error")

      if (result.tag === "error") {
        expect(result.errors).toEqual(errors)
        expect(result.message).toEqual("validations.not-valid")
      }
    })
  })
})
