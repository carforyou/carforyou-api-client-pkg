import { fetchGBDScores } from "../goodBadDealData"

describe("CAR service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchGBDScores", () => {
    const scores = ["good-deal", "bad-deal"]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(scores))
    })

    it("returns data", async () => {
      const fetched = await fetchGBDScores()

      expect(fetched).toEqual(scores)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
