import { postBulkDealerFeedback } from "../bulkDealerFeedback"

describe("Car sale tracking API", () => {
  beforeEach(fetchMock.resetMocks)

  describe("#addPurchaseConfirmation", () => {
    beforeEach(() => {
      fetchMock.mockResponse("")
    })

    it("calls purchase confirmation endpoint", async () => {
      await postBulkDealerFeedback({
        dealerId: 10,
        elements: [
          {
            listingId: 0,
            purchaseConfirmed: false,
          },
        ],
        options: { accessToken: "TOKEN" },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/dealers\/10\/listings\/car-sale\/dealer-feedback$/
        ),
        expect.any(Object)
      )
    })
  })
})
