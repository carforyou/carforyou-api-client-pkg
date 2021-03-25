import { postDealerFeedback } from "../dealerFeedback"

describe("#postDealerFeedback", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe("valid parameters", () => {
    beforeEach(() => {
      fetchMock.mockResponse("")
    })

    describe("validate only", () => {
      it("calls validation endpoint", async () => {
        await postDealerFeedback({
          dealerId: 1234,
          listingId: 4567,
          purchaseConfirmed: true,
          options: { accessToken: "TOKEN" },
        })

        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /\/dealers\/1234\/listings\/4567\/car-sale\/dealer-feedback$/
          ),
          expect.any(Object)
        )
      })

      it("returns a success", async () => {
        const result = await postDealerFeedback({
          dealerId: 1234,
          listingId: 4567,
          purchaseConfirmed: true,
          options: { accessToken: "TOKEN" },
        })

        expect(result).toEqual({
          tag: "success",
          result: {},
        })
      })
    })

    describe("submit", () => {
      it("calls submission endpoint", async () => {
        await postDealerFeedback({
          dealerId: 1234,
          listingId: 4567,
          purchaseConfirmed: true,
          options: { accessToken: "TOKEN" },
        })

        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching(
            /\/dealers\/1234\/listings\/4567\/car-sale\/dealer-feedback$/
          ),
          expect.any(Object)
        )
      })

      it("returns a success", async () => {
        const result = await postDealerFeedback({
          dealerId: 1234,
          listingId: 4567,
          purchaseConfirmed: true,
          options: { accessToken: "TOKEN" },
        })

        expect(result).toEqual({
          tag: "success",
          result: {},
        })
      })
    })
  })
})
