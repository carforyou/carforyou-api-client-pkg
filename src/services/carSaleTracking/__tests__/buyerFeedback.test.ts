import { addPurchaseConfirmation } from "../buyerFeedback"
import { ResponseError } from "../../../responseError"

describe("Car sale tracking API", () => {
  beforeEach(fetchMock.resetMocks)

  describe("#addPurchaseConfirmation", () => {
    beforeEach(() => {
      fetchMock.mockResponse("")
    })

    it("calls purchase confirmation endpoint", async () => {
      await addPurchaseConfirmation({
        key: "abc123",
        confirmed: true,
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/car-sale\/buyer-feedback\/key\/abc123\/add-purchase-confirmation$/
        ),
        expect.any(Object)
      )
    })

    it("throws ResponseError 422", async () => {
      fetchMock.mockResponse(
        JSON.stringify({
          message: "validation.purchase-confirmation-already-added",
          description: "Purchase confirmation for BuyerFeedback already added",
          errors: [],
        }),
        {
          status: 422,
        }
      )

      let error
      try {
        await addPurchaseConfirmation({
          key: "abc123",
          confirmed: true,
        })
      } catch (err) {
        error = err
      }

      expect(error).toEqual(new ResponseError(error.response))
    })
  })
})
