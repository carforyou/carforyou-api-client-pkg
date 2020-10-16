import { fetchCity, fetchCitySuggestions } from "../city"

describe("SEARCH service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchCity", () => {
    const city = [{ id: 1, name: "Zurich", zipCode: "8008" }]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(city))
    })

    it("returns data", async () => {
      const fetched = await fetchCity({ id: 1, language: "de" })

      expect(fetched).toEqual(city)
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe("fetchCitySuggestions", () => {
    const cities = [
      { id: 1, name: "Zurich", zipCode: "8008" },
      { id: 2, name: "Basel", zipCode: "8009" },
      { id: 4, name: "Luzern", zipCode: "8002" },
    ]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(cities))
    })

    it("returns data", async () => {
      const fetched = await fetchCitySuggestions({
        language: "de",
        query: "800",
      })

      expect(fetched).toEqual(cities)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
