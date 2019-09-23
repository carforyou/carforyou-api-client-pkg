import { fetchMakes } from "../catalogue"

describe("CATALOGUE service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchMakes", () => {
    const makes = [
      { id: 1, name: "Audi" },
      { id: 2, name: "BMW" },
      { id: 3, name: "Chevrolet" }
    ]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(makes))
    })

    it("returns data", async () => {
      const fetched = await fetchMakes()

      expect(fetched).toEqual(makes)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
