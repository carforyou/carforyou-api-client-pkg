import { fetchDealScores } from "../goodBadDealData"

describe("CAR service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchDealScores", () => {
    const scores = ["good-deal", "bad-deal"]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(scores))
    })

    it("returns data", async () => {
      const fetched = await fetchDealScores()

      expect(fetched).toEqual(scores)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
