import { fetchZipCodes } from "../zipCodes"

describe("SEARCH service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchZipCodes", () => {
    const zipCodes = [
      {
        zipCode: "1006",
        de: "Lausanne",
        fr: "Lausanne",
        it: "Losanna"
      },
      {
        zipCode: "1007",
        de: "Lausanne",
        fr: "Lausanne",
        it: "Losanna"
      },
      {
        zipCode: "1008",
        de: "Prilly",
        fr: "Prilly",
        it: "Prilly"
      }
    ]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(zipCodes))
    })

    it("returns data", async () => {
      const fetched = await fetchZipCodes()

      expect(fetched).toEqual(zipCodes)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
