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
        key: 12345,
        confirmed: true,
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/buyer-feedback\/key\/12345\/add-purchase-confirmation$/
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
          key: 12345,
          confirmed: true,
        })
      } catch (err) {
        error = err
      }

      expect(error).toEqual(new ResponseError(error.response))
    })
  })
})
