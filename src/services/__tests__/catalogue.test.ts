import { fetchMakes, fetchModels, fetchType } from "../catalogue"

import { Type } from "../../lib/factories/type"

describe("CATALOGUE service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("#fetchMakes", () => {
    const makes = [
      { id: 1, name: "Audi", key: "audi" },
      { id: 2, name: "BMW", key: "bmw" },
      { id: 3, name: "Chevrolet", key: "chevrolet" },
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

  describe("#fetchModels", () => {
    const models = [
      { id: 1, name: "A4", key: "a4" },
      { id: 2, name: "A5", key: "a5" },
      { id: 4, name: "A6", key: "a6" },
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

  describe("#fetchType", () => {
    const type = Type({ id: 123 })

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(type))
    })

    it("returns type", async () => {
      const fetchedType = await fetchType(123)

      expect(fetchedType).toEqual(type)
      expect(fetch).toHaveBeenCalled()
    })

    it("fetches the correct type", async () => {
      await fetchType(123)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/types/123"),
        expect.any(Object)
      )
    })
  })
})
