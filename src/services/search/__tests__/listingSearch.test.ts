import { fetchListingCount } from "../listingSearch"

describe("SEARCH service", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const priceTo = 5000
  const bodyType = ["cabriolet"]

  const makeKey = ["audi"]
  const modelKey = ["a4"]

  const bodyTypeQuery = { bodyType, priceTo }
  const makeModelQuery = { makeKey, modelKey, priceTo }

  describe("#fetchCount", () => {
    const count = 42

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify({ count }))
    })

    it("unwraps the count from json", async () => {
      const received = await fetchListingCount()

      expect(received).toEqual(count)
      expect(fetch).toHaveBeenCalled()
    })

    describe("query", () => {
      it("accepts priceTo and bodyType params", async () => {
        await fetchListingCount(bodyTypeQuery)

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining("/listings/count"),
          expect.objectContaining({
            body: JSON.stringify({
              query: { bodyType, priceTo }
            })
          })
        )
      })

      it("accepts makeKey, modelKey and priceTo params", async () => {
        await fetchListingCount(makeModelQuery)

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining("/listings/count"),
          expect.objectContaining({
            body: JSON.stringify({
              query: {
                makeKey,
                modelKey,
                priceTo
              }
            })
          })
        )
      })
    })
  })
})
