import PaginatedFactory from "../../../lib/factories/paginated"
import { SearchListing } from "../../../lib/factories/listing"

import { encodeDate } from "../../../lib/dateEncoding"

import {
  fetchListingCount,
  fetchListings,
  fetchNeedsAssesmentListings,
  fetchMoneybackListings
} from "../listingSearch"

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
        await fetchListingCount(bodyTypeQuery)

        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining("/listings/count"),
          expect.objectContaining({
            body: JSON.stringify({
              query: { bodyType, priceTo },
              includeFacets: true
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
              },
              includeFacets: true
            })
          })
        )
      })
    })
  })

  describe("#fetchListings", () => {
    const {
      content,
      pagination,
      facets,
      fieldsStats,
      topListing
    } = PaginatedFactory([SearchListing({ id: 1 })])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content: content.map(listing => ({
            ...listing,
            firstRegistrationDate: encodeDate(listing.firstRegistrationDate)
          })),
          facets,
          ...pagination,
          fieldsStats,
          topListing
        })
      )
    })

    it("unwraps the content from json", async () => {
      const paginatedListings = await fetchListings()
      const listings = paginatedListings.content

      expect(listings.length).toEqual(1)
      expect(listings).toEqual(content)
      expect(fetch).toHaveBeenCalled()
    })

    describe("Pagination", () => {
      it("is unwraped from json", async () => {
        const paginatedListings = await fetchListings()

        expect(paginatedListings.pagination).toEqual(pagination)
        expect(fetch).toHaveBeenCalled()
      })
    })

    describe("FieldsStats", () => {
      it("are unwraped from json", async () => {
        const paginatedListings = await fetchListings()

        expect(paginatedListings.fieldsStats).toEqual(fieldsStats)
        expect(fetch).toHaveBeenCalled()
      })
    })

    describe("Facets", () => {
      it("are unwraped from json", async () => {
        const paginatedListings = await fetchListings()

        expect(paginatedListings.facets).toEqual(facets)
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

  describe("#fetchNeedsAssesmentListings", () => {
    const { content, pagination, facets, fieldsStats } = PaginatedFactory([
      SearchListing({ id: 1 })
    ])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content: content.map(listing => ({
            ...listing,
            firstRegistrationDate: encodeDate(listing.firstRegistrationDate)
          })),
          facets,
          ...pagination,
          fieldsStats
        })
      )
    })

    it("encodes the date", async () => {
      const paginatedListings = await fetchNeedsAssesmentListings()
      const listings = paginatedListings.content

      expect(listings[0].firstRegistrationDate).toEqual(
        content[0].firstRegistrationDate
      )
    })
  })

  describe("#fetchMoneybackListings", () => {
    const { content, pagination, facets, fieldsStats } = PaginatedFactory([
      SearchListing({ id: 1 })
    ])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content: content.map(listing => ({
            ...listing,
            firstRegistrationDate: encodeDate(listing.firstRegistrationDate)
          })),
          facets,
          ...pagination,
          fieldsStats
        })
      )
    })

    it("encodes the date", async () => {
      const paginatedListings = await fetchMoneybackListings(123, {
        makeKey: "audi",
        size: 24,
        page: 1
      })
      const listings = paginatedListings.content

      expect(listings[0].firstRegistrationDate).toEqual(
        content[0].firstRegistrationDate
      )
    })
  })
})
