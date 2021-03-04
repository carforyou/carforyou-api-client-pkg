import {
  fetchDealerDefaultListingData,
  saveDealerDefaultListingDescription,
  saveDealerDefaultListingAdditionalServices,
  saveDealerDefaultListingWarranty,
} from "../defaultListing"

describe("Dealer default listing", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchDealerDefaultListing", () => {
    const dealerId = 123789
    const dealerDefaultListing = {
      deliveryFeeIncluded: true,
      description: "string",
      expertInstructionIncluded: true,
      fullTankIncluded: true,
      nextInspectionIncluded: true,
      otherServices: "string",
      vignetteIncluded: true,
      warrantyDetails: "string",
      warrantyDuration: 0,
      warrantyMileage: 0,
      warrantyStartDate: "2021-03-04",
      warrantyType: "from-date",
    }

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(dealerDefaultListing))
    })

    it("returns data", async () => {
      const fetched = await fetchDealerDefaultListingData({
        dealerId,
        options: { accessToken: "TOKEN" },
      })

      expect(fetched).toEqual(dealerDefaultListing)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(`dealers/${dealerId}/default-listing`),
        expect.any(Object)
      )
    })
  })

  describe("#saveDealerDefaultListingDescription", () => {
    it("sends description in the body", async () => {
      const description = { description: "this is a big description text" }

      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await saveDealerDefaultListingDescription({
        dealerId: 123,
        description,
        options: { accessToken: "TOKEN" },
      })
      expect(response).toEqual({ tag: "success", result: { ok: true } })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/123/default-listing/description"),
        expect.objectContaining({
          body: JSON.stringify({ description }),
        })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "description", error: "validations.not-empty" }]
      const description = { description: "this is a big description text" }

      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await saveDealerDefaultListingDescription({
        dealerId: 123,
        description,
        options: { accessToken: "TOKEN" },
      })

      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })

  describe("#saveDealerDefaultListingWarranty", () => {
    it("sends description in the body", async () => {
      const warranty = {
        warrantyDetails: "string",
        warrantyDuration: 0,
        warrantyMileage: 0,
        warrantyStartDate: "2021-03-04",
        warrantyType: "from-date",
      }

      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await saveDealerDefaultListingWarranty({
        dealerId: 123,
        warranty,
        options: { accessToken: "TOKEN" },
      })
      expect(response).toEqual({ tag: "success", result: { ok: true } })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/123/default-listing/warranty"),
        expect.objectContaining({
          body: JSON.stringify({ warranty }),
        })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "warranty", error: "validations.not-empty" }]
      const warranty = {
        warrantyDetails: "string",
        warrantyDuration: 0,
        warrantyMileage: 0,
        warrantyStartDate: "2021-03-04",
        warrantyType: "from-date",
      }
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await saveDealerDefaultListingWarranty({
        dealerId: 123,
        warranty,
        options: { accessToken: "TOKEN" },
      })

      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })

  describe("#saveDealerDefaultListingAdditionalServices", () => {
    it("sends description in the body", async () => {
      const additionalServices = {
        deliveryFeeIncluded: true,
        description: "string",
        expertInstructionIncluded: true,
        fullTankIncluded: true,
        nextInspectionIncluded: true,
        otherServices: "string",
        vignetteIncluded: true,
      }

      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await saveDealerDefaultListingAdditionalServices({
        dealerId: 123,
        additionalServices,
        options: { accessToken: "TOKEN" },
      })
      expect(response).toEqual({ tag: "success", result: { ok: true } })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "/dealers/123/default-listing/additional-services"
        ),
        expect.objectContaining({
          body: JSON.stringify({ additionalServices }),
        })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [
        { param: "additionalServices", error: "validations.not-empty" },
      ]
      const additionalServices = {
        deliveryFeeIncluded: true,
        description: "string",
        expertInstructionIncluded: true,
        fullTankIncluded: true,
        nextInspectionIncluded: true,
        otherServices: "string",
        vignetteIncluded: true,
      }
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await saveDealerDefaultListingAdditionalServices({
        dealerId: 123,
        additionalServices,
        options: { accessToken: "TOKEN" },
      })

      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })
})
