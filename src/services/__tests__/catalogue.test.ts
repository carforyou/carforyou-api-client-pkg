import { fetchMakes, fetchModels } from "../catalogue"

describe("CATALOGUE service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchMakes", () => {
    const makes = [
      { id: 1, name: "Audi", key: "audi" },
      { id: 2, name: "BMW", key: "bmw" },
      { id: 3, name: "Chevrolet", key: "chevrolet" }
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

  describe("fetchModels", () => {
    const models = [
      { id: 1, name: "A4", key: "a4" },
      { id: 2, name: "A5", key: "a5" },
      { id: 4, name: "A6", key: "a6" }
    ]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(models))
    })

    it("returns data", async () => {
      const fetched = await fetchModels("audi")

      expect(fetched).toEqual(models)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
