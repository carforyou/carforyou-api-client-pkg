import {
  fetchDealerDefaultListing,
  saveDealerDefaultDescription,
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
      const fetched = await fetchDealerDefaultListing({
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

  describe("#saveDealerDefaultDescription", () => {
    it("sends description in the body", async () => {
      const description = "this is a big description text"

      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await saveDealerDefaultDescription({
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
      const description = "this is a big description text"

      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await saveDealerDefaultDescription({
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
})
