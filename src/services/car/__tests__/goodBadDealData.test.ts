import { featchDealScores } from "../goodBadDealData"

describe("CAR service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("featchDealScores", () => {
    const scores = ["good-deal", "bad-deal"]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(scores))
    })

    it("returns data", async () => {
      const fetched = await featchDealScores()

      expect(fetched).toEqual(scores)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
