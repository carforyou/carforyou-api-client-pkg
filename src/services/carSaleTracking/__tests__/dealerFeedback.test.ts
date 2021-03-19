import { postDealerFeedback } from "../dealerFeedback"
import { ResponseError } from "../../../responseError"

describe("Car sale tracking API", () => {
  beforeEach(fetchMock.resetMocks)

  describe("#postDealerFeedback", () => {
    beforeEach(() => {
      fetchMock.mockResponse("")
    })

    it("calls purchase confirmation", async () => {
      await postDealerFeedback({
        dealerId: 1234,
        listingId: 4567,
        purchaseConfirmed: true,
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/dealers\/1234\/listings\/4567\/car-sale\/dealer-feedback$/
        ),
        expect.any(Object)
      )
    })

    it("throws ResponseError 422", async () => {
      fetchMock.mockResponse(
        JSON.stringify({
          message: "validation.purchase-confirmation-already-added",
          description: "Purchase confirmation for DealerFeedback already added",
          errors: [],
        }),
        {
          status: 422,
        }
      )

      let error
      try {
        await postDealerFeedback({
          dealerId: 1234,
          listingId: 4567,
          purchaseConfirmed: true,
        })
      } catch (err) {
        error = err
      }

      expect(error).toEqual(new ResponseError(error.response))
    })
  })
})
