import { fetchDealerListingsFacets, fetchFacets } from "../facets"

describe("fetchFacets", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("returns the response form the api", async () => {
    const facets = { facets: { makeKey: 312 }, topFacets: { makeKey: 312 } }
    fetchMock.mockResponse(JSON.stringify(facets))

    const fetched = await fetchFacets()

    expect(fetched).toEqual(facets)
    expect(fetch).toHaveBeenCalled()
  })
})

describe("fetchDealerListingsFacets", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it("unwraps facets from json", async () => {
    const facets = { makeKey: 312 }
    fetchMock.mockResponse(JSON.stringify({ facets }))

    const fetched = await fetchDealerListingsFacets({
      dealerId: 123,
      options: { accessToken: "TOKEN" },
    })

    expect(fetched).toEqual(facets)
    expect(fetch).toHaveBeenCalled()
  })
})
