import {
  fetchListingCount,
  fetchDealerListingsCount,
  fetchListings,
  fetchMoneybackListings,
  fetchNeedsAssessmentListings,
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

    it("passes query in the query string", async () => {
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

  describe("#fetchListings", () => {
    const { content, pagination, fieldsStats, topListing } = PaginatedFactory([
      SearchListing({ id: 1 }),
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
      expect(listings).toEqual(content)
      expect(fetch).toHaveBeenCalled()
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

  describe("#fetchNeedsAssessmentListings", () => {
    const { content, pagination, fieldsStats } = PaginatedFactory([
      SearchListing({ id: 1 }),
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
        })
      )
    })

    it("encodes the date", async () => {
      const paginatedListings = await fetchNeedsAssessmentListings()
      const listings = paginatedListings.content

      expect(listings[0].firstRegistrationDate).toEqual(
        content[0].firstRegistrationDate
      )
    })
  })

  describe("#fetchMoneybackListings", () => {
    const { content, pagination, fieldsStats } = PaginatedFactory([
      SearchListing({ id: 1 }),
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
        })
      )
    })

    it("encodes the date", async () => {
      const paginatedListings = await fetchMoneybackListings({
        dealerId: 123,
        query: {
          makeKey: "audi",
          size: 24,
          page: 1,
        },
      })
      const listings = paginatedListings.content

      expect(listings[0].firstRegistrationDate).toEqual(
        content[0].firstRegistrationDate
      )
    })
  })
})
