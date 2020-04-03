import { fetchFacets } from "../facets"

describe("Facets", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("are unwraped from json", async () => {
    const facets = { makeKey: 312 }
    fetchMock.mockResponse(JSON.stringify({ facets }))

    const fetched = await fetchFacets()

    expect(fetched).toEqual(facets)
    expect(fetch).toHaveBeenCalled()
  })
})
