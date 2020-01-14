import {
  fetchListing,
  fetchDealerListings,
  validateDealerListing,
  ListingValidationEndpoint,
  prepareListingData,
  saveDealerListing
} from "../inventory"

import {
  DealerListingSortTypeParams,
  DealerListingSortOrderParams
} from "../../../types/sort"

import Paginated from "../../../lib/factories/paginated"
import { Listing, EmptyListing } from "../../../lib/factories/listing"
import { encodeDate } from "../../../lib/dateEncoding"

const dealerId = 123

describe("CAR service", () => {
  beforeEach(() => {
    fetchMock.mockClear()
  })

  describe("#fetchListing", () => {
    const listing = Listing({ id: 10 })

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          ...listing,
          firstRegistrationDate: encodeDate(listing.firstRegistrationDate),
          lastInspectionDate: encodeDate(listing.lastInspectionDate)
        })
      )
    })

    it("returns ListingAttributes", async () => {
      const fetchedListing = await fetchListing(10)

      expect(fetch).toHaveBeenCalled()
      expect(fetchedListing).toEqual(listing)
    })
  })

  describe("#fetchDealerListings", () => {
    const { content, pagination } = Paginated([Listing()])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content: content.map(listing => ({
            ...listing,
            firstRegistrationDate: encodeDate(listing.firstRegistrationDate),
            lastInspectionDate: encodeDate(listing.lastInspectionDate)
          })),
          ...pagination
        })
      )
    })

    it("unwraps the content from json", async () => {
      const paginatedListings = await fetchDealerListings(dealerId)
      const listings = paginatedListings.content

      expect(listings.length).toEqual(1)
      expect(listings).toEqual(content)
      expect(fetch).toHaveBeenCalled()
    })

    describe("Pagination", () => {
      it("is unwraped from json", async () => {
        const paginatedListings = await fetchDealerListings(dealerId)

        expect(paginatedListings.pagination).toEqual(pagination)
        expect(fetch).toHaveBeenCalled()
      })
    })

    describe("query formatting", () => {
      describe("pagination", () => {
        it("indexes page from 0", async () => {
          await fetchDealerListings(dealerId, { page: 5 })

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(`dealers/${dealerId}/listings?(.*)page=4`)
            ),
            expect.any(Object)
          )
        })

        it("defaults `page` to 0 when not provided", async () => {
          await fetchDealerListings(dealerId, {
            size: 10
          })

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(`dealers/${dealerId}/listings?(.*)page=0`)
            ),
            expect.any(Object)
          )
        })

        it("defaults `size` to 25 when it's not provided", async () => {
          await fetchDealerListings(dealerId, { page: 5 })

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(`dealers/${dealerId}/listings?(.*)size=25`)
            ),
            expect.any(Object)
          )
        })
      })

      describe("sort", () => {
        it("can sort by creation date", async () => {
          await fetchDealerListings(dealerId, {
            sortType: DealerListingSortTypeParams.CREATED_DATE,
            sortOrder: DealerListingSortOrderParams.ASC
          })

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(
                `dealers/${dealerId}/listings?(.*)sort=createdDate%2Casc`
              )
            ),
            expect.any(Object)
          )
        })

        it("defaults to sorting by creation date, descending", async () => {
          await fetchDealerListings(dealerId)

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(
                `dealers/${dealerId}/listings?(.*)sort=createdDate%2Cdesc`
              )
            ),
            expect.any(Object)
          )
        })
      })
    })
  })

  describe("#validateDealerListing", () => {
    const listing = Listing({ id: 123 })

    describe("uses correct endpoint", () => {
      beforeEach(() => {
        fetchMock.mockResponse(null, { status: 200 })
      })

      it("when validating draft", async () => {
        await validateDealerListing({
          dealerId,
          listing,
          validationEndpoint: ListingValidationEndpoint.draft
        })

        expect(fetchMock).toHaveBeenCalledWith(
          expect.stringMatching(`dealers/${dealerId}/listings/validate`),
          expect.objectContaining({
            body: JSON.stringify(prepareListingData(listing)),
            method: "POST"
          })
        )
      })

      it("when validating publication", async () => {
        await validateDealerListing({
          dealerId,
          listing,
          validationEndpoint: ListingValidationEndpoint.publish
        })

        expect(fetchMock).toHaveBeenCalledWith(
          expect.stringMatching(
            `dealers/${dealerId}/listings/123/publish/validate`
          ),
          expect.objectContaining({
            body: JSON.stringify(prepareListingData(listing)),
            method: "POST"
          })
        )
      })
    })

    describe("and successful validation", () => {
      beforeEach(() => {
        fetchMock.mockResponse(null, { status: 200 })
      })

      it("returns the listing if validation is successful", async () => {
        const result = await validateDealerListing({
          dealerId,
          listing,
          validationEndpoint: ListingValidationEndpoint.publish
        })

        expect(result).toEqual({
          tag: "success",
          result: listing
        })
      })
    })

    describe("and failed validation", () => {
      const message = "validation.listing-not-publishable"
      const errors = [{ param: "price", message: "validation.field.not-empty" }]

      beforeEach(() => {
        fetchMock.mockResponses([
          JSON.stringify({
            message,
            errors
          }),
          { status: 400 }
        ])
      })

      it("returns the validation errors if validation fails", async () => {
        const result = await validateDealerListing({
          dealerId,
          listing,
          validationEndpoint: ListingValidationEndpoint.publish
        })

        expect(result).toEqual({
          tag: "error",
          message,
          errors
        })
      })
    })
  })

  describe("#saveDealerListing", () => {
    describe("for the new listing", () => {
      const listing = EmptyListing()

      beforeEach(() => {
        fetchMock.mockResponse(JSON.stringify({ id: 123 }))
      })

      it("posts", async () => {
        await saveDealerListing({
          dealerId: 1234,
          listing
        })

        expect(fetchMock).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ method: "POST" })
        )
      })

      it("returns the listing", async () => {
        const result = await saveDealerListing({
          dealerId: 1234,
          listing
        })

        expect(result).toEqual({
          tag: "success",
          result: { ...listing, id: 123 }
        })
      })
    })

    describe("for the existing listing", () => {
      const listing = { ...EmptyListing(), id: 123 }

      beforeEach(() => {
        fetchMock.mockResponse(null)
      })

      it("puts", async () => {
        await saveDealerListing({
          dealerId: 1234,
          listing
        })

        expect(fetchMock).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ method: "PUT" })
        )
      })

      it("returns the listing", async () => {
        const result = await saveDealerListing({
          dealerId: 1234,
          listing
        })

        expect(result).toEqual({ tag: "success", result: listing })
      })
    })
  })

})
