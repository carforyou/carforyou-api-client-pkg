import { fetchRegions } from "../regions"

describe("SEARCH service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchRegions", () => {
    const regions = [{ name: "Zurich", key: "zurich" }]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(regions))
    })

    it("returns data", async () => {
      const fetched = await fetchRegions({ language: "en" })

      expect(fetched).toEqual(regions)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
