import {
  fetchAggregations,
  fetchDealerArchivedListings,
  fetchDealerArchivedListingsCount,
  fetchDealerListings,
  fetchDealerListingsCount,
  fetchListingCount,
  fetchListings,
} from "../listingSearch"
import PaginatedFactory from "../../../lib/factories/paginated"
import { SearchListing } from "../../../lib/factories/listing"

import { encodeDate } from "../../../lib/dateEncoding"

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

      expect(received.count).toEqual(count)
      expect(fetch).toHaveBeenCalled()
    })

    describe("query", () => {
      it("accepts priceTo and bodyType params", async () => {
        await fetchListingCount({ query: bodyTypeQuery })

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining("/listings/count"),
          expect.objectContaining({
            body: JSON.stringify({
              query: { bodyType, priceTo },
            }),
          })
        )
      })

      it("accepts makeKey, modelKey and priceTo params", async () => {
        await fetchListingCount({ query: makeModelQuery })

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining("/listings/count"),
          expect.objectContaining({
            body: JSON.stringify({
              query: {
                makeKey,
                modelKey,
                priceTo,
              },
            }),
          })
        )
      })

      it("converts the location filter", async () => {
        await fetchListingCount({ query: { cityId: "12345", radius: "20" } })

        expect(fetch).toHaveBeenCalledWith(
          expect.stringMatching("listings/count"),
          expect.objectContaining({
            body: JSON.stringify({
              query: { location: { cityId: "12345", radius: "20" } },
            }),
          })
        )
      })
    })
  })

  describe("#fetchDealerListingsCount", () => {
    const dealerId = 123
    const requestOptionsMock = {
      accessToken: "DUMMY TOKEN",
    }

    it("unwraps count from json", async () => {
      const count = 400
      fetchMock.mockResponse(JSON.stringify({ count }))

      const response = await fetchDealerListingsCount({
        dealerId,
        options: requestOptionsMock,
      })
      expect(response).toEqual(count)
      expect(fetch).toHaveBeenCalled()
    })

    it("passes query in the request body", async () => {
      const query = { isActive: true }
      fetchMock.mockResponse(JSON.stringify({ count: 40 }))

      await fetchDealerListingsCount({
        dealerId,
        query,
        options: requestOptionsMock,
      })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/dealers/${dealerId}/listings/count`),
        expect.objectContaining({
          body: JSON.stringify({ query: { isActive: true } }),
        })
      )
    })
  })

  describe("#fetchDealerArchivedListingsCount", () => {
    const dealerId = 123
    const requestOptionsMock = {
      accessToken: "DUMMY TOKEN",
    }

    it("unwraps count from json", async () => {
      const count = 400
      fetchMock.mockResponse(JSON.stringify({ count }))

      const response = await fetchDealerArchivedListingsCount({
        dealerId,
        options: requestOptionsMock,
      })
      expect(response).toEqual(count)
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe("#fetchListings", () => {
    const { content, pagination, fieldsStats, topListing } = PaginatedFactory([
      SearchListing({ id: 1, gbdScore: null }),
    ])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content: content.map((listing) => ({
            ...listing,
            firstRegistrationDate: encodeDate(listing.firstRegistrationDate),
          })),
          ...pagination,
          fieldsStats,
          ...(topListing && {
            topListing: {
              ...topListing,
              firstRegistrationDate: encodeDate(
                topListing.firstRegistrationDate
              ),
            },
          }),
        })
      )
    })

    it("unwraps the content from json", async () => {
      const paginatedListings = await fetchListings()
      const listings = paginatedListings.content

      expect(listings.length).toEqual(1)
      expect(content.length).toEqual(1)
      expect(content[0].id).toEqual(listings[0].id)
      expect(fetch).toHaveBeenCalled()
    })

    it("converts the location filter", async () => {
      await fetchListings({ query: { cityId: "12345", radius: "20" } })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching("listings/search"),
        expect.objectContaining({
          body: JSON.stringify({
            pagination: { page: 0, size: 24 },
            sort: [{ order: "ASC", type: "RELEVANCE" }],
            userInfo: {},
            query: { location: { cityId: "12345", radius: "20" } },
          }),
        })
      )
    })

    it("falls back to gbdScore not-defined when field is null", async () => {
      const paginatedListings = await fetchListings()

      expect(paginatedListings.content[0].gbdScore).toEqual("not-defined")
    })

    describe("Pagination", () => {
      it("is unwrapped from json", async () => {
        const paginatedListings = await fetchListings()

        expect(paginatedListings.pagination).toEqual(pagination)
        expect(fetch).toHaveBeenCalled()
      })
    })

    describe("FieldsStats", () => {
      it("are unwrapped from json", async () => {
        const paginatedListings = await fetchListings()

        expect(paginatedListings.fieldsStats).toEqual(fieldsStats)
        expect(fetch).toHaveBeenCalled()
      })
    })

    describe("TopListing", () => {
      it("fetch", async () => {
        const paginatedListings = await fetchListings()
        expect(paginatedListings.topListing).toEqual(topListing)
        expect(fetch).toHaveBeenCalled()
      })
    })
  })

  describe("#fetchDealerListings", () => {
    const dealerId = 123
    const requestOptionsMock = {
      accessToken: "DUMMY TOKEN",
    }
    const { content, pagination } = PaginatedFactory([SearchListing()])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content: content.map((listing) => ({
            ...listing,
            firstRegistrationDate: encodeDate(listing.firstRegistrationDate),
          })),
          ...pagination,
        })
      )
    })

    it("unwraps the content from json", async () => {
      const paginatedListings = await fetchDealerListings({
        dealerId,
        options: requestOptionsMock,
      })
      const listings = paginatedListings.content

      expect(listings.length).toEqual(1)
      expect(listings).toEqual(content)
      expect(fetch).toHaveBeenCalled()
    })

    describe("Pagination", () => {
      it("is unwrapped from json", async () => {
        const paginatedListings = await fetchDealerListings({
          dealerId,
          options: requestOptionsMock,
        })

        expect(paginatedListings.pagination).toEqual(pagination)
        expect(fetch).toHaveBeenCalled()
      })
    })
  })

  describe("#fetchDealerArchivedListings", () => {
    const dealerId = 123
    const requestOptionsMock = {
      accessToken: "DUMMY TOKEN",
    }
    const { content, pagination } = PaginatedFactory([SearchListing()])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content: content.map((listing) => ({
            ...listing,
            firstRegistrationDate: encodeDate(listing.firstRegistrationDate),
          })),
          ...pagination,
        })
      )
    })

    it("unwraps the content from json", async () => {
      const paginatedListings = await fetchDealerArchivedListings({
        dealerId,
        options: requestOptionsMock,
      })
      const listings = paginatedListings.content

      expect(listings.length).toEqual(1)
      expect(listings).toEqual(content)
      expect(fetch).toHaveBeenCalled()
    })

    describe("Pagination", () => {
      it("is unwrapped from json", async () => {
        const paginatedListings = await fetchDealerArchivedListings({
          dealerId,
          options: requestOptionsMock,
        })

        expect(paginatedListings.pagination).toEqual(pagination)
        expect(fetch).toHaveBeenCalled()
      })
    })
  })

  describe("fetchAggregations", () => {
    beforeEach(() => {
      fetchMock.resetMocks()
    })

    it("returns the response form the api", async () => {
      const response = { aggregations: { locationSimple: { "1234/456": 10 } } }
      fetchMock.mockResponse(JSON.stringify(response))

      const fetched = await fetchAggregations({
        query: bodyTypeQuery,
      })

      expect(fetched).toEqual(response)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
