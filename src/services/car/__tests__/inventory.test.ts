import {
  fetchListing,
  fetchDealerListings,
  validateDealerListing,
  ListingValidationEndpoint,
  prepareListingData,
  saveDealerListing,
  listingMandatoryFields,
  fetchDealerListingsCount,
  fetchDealerMakes,
  publishDealerListing,
  archiveDealerListing,
  unpublishDealerListing,
  transferDealerListingToManual,
  hideListing,
  unhideListing,
} from "../inventory"

import {
  DealerListingSortTypeParams,
  DealerListingSortOrderParams,
} from "../../../types/sort"

import Paginated from "../../../lib/factories/paginated"
import { Listing, EmptyListing } from "../../../lib/factories/listing"
import { encodeDate } from "../../../lib/dateEncoding"

const dealerId = 123
const requestOptionsMock = {
  accessToken: "DUMMY TOKEN",
}

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
          lastInspectionDate: encodeDate(listing.lastInspectionDate),
        })
      )
    })

    it("returns ListingAttributes", async () => {
      const fetchedListing = await fetchListing({ id: 10 })

      expect(fetch).toHaveBeenCalled()
      expect(fetchedListing).toEqual(listing)
    })
  })

  describe("#fetchDealerListings", () => {
    const { content, pagination } = Paginated([Listing()])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content: content.map((listing) => ({
            ...listing,
            firstRegistrationDate: encodeDate(listing.firstRegistrationDate),
            lastInspectionDate: encodeDate(listing.lastInspectionDate),
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

    describe("query formatting", () => {
      describe("pagination", () => {
        it("indexes page from 0", async () => {
          await fetchDealerListings({
            dealerId,
            query: { page: 5 },
            options: requestOptionsMock,
          })

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(`dealers/${dealerId}/listings?(.*)page=4`)
            ),
            expect.any(Object)
          )
        })

        it("defaults `page` to 0 when not provided", async () => {
          await fetchDealerListings({
            dealerId,
            query: {
              size: 10,
            },
            options: requestOptionsMock,
          })

          expect(fetchMock).toHaveBeenCalledWith(
            expect.stringMatching(
              new RegExp(`dealers/${dealerId}/listings?(.*)page=0`)
            ),
            expect.any(Object)
          )
        })

        it("defaults `size` to 25 when it's not provided", async () => {
          await fetchDealerListings({
            dealerId,
            query: { page: 5 },
            options: requestOptionsMock,
          })

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
          await fetchDealerListings({
            dealerId,
            query: {
              sortType: DealerListingSortTypeParams.CREATED_DATE,
              sortOrder: DealerListingSortOrderParams.ASC,
            },
            options: requestOptionsMock,
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
          await fetchDealerListings({ dealerId, options: requestOptionsMock })

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

  describe("#fetchDealerMakes", () => {
    it("fetches data", async () => {
      const makes = [
        { make: "Audi", makeKey: "audi" },
        { make: "BMW", makeKey: "bmw" },
      ]
      fetchMock.mockResponse(JSON.stringify(makes))

      const data = await fetchDealerMakes({ dealerId: 123 })
      expect(data).toEqual(makes)
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe("#fetchDealerListingsCount", () => {
    it("unwraps count from json", async () => {
      const count = 400
      fetchMock.mockResponse(JSON.stringify({ count }))

      const response = await fetchDealerListingsCount({
        dealerId: 123,
        options: requestOptionsMock,
      })
      expect(response).toEqual(count)
      expect(fetch).toHaveBeenCalled()
    })

    it("passes query in the query string", async () => {
      const query = { isActive: true }
      fetchMock.mockResponse(JSON.stringify({ count: 40 }))

      await fetchDealerListingsCount({
        dealerId: 123,
        query,
        options: requestOptionsMock,
      })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/123/listings/count?isActive=true"),
        expect.any(Object)
      )
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
          options: {
            validationEndpoint: ListingValidationEndpoint.draft,
            ...requestOptionsMock,
          },
        })

        expect(fetchMock).toHaveBeenCalledWith(
          expect.stringMatching(`dealers/${dealerId}/listings/validate`),
          expect.objectContaining({
            body: JSON.stringify(prepareListingData(listing)),
            method: "POST",
          })
        )
      })

      it("when validating publication", async () => {
        await validateDealerListing({
          dealerId,
          listing,
          options: {
            validationEndpoint: ListingValidationEndpoint.publish,
            ...requestOptionsMock,
          },
        })

        expect(fetchMock).toHaveBeenCalledWith(
          expect.stringMatching(
            `dealers/${dealerId}/listings/123/publish/validate`
          ),
          expect.objectContaining({
            body: JSON.stringify(prepareListingData(listing)),
            method: "POST",
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
          options: {
            validationEndpoint: ListingValidationEndpoint.publish,
            ...requestOptionsMock,
          },
        })

        expect(result).toEqual({
          tag: "success",
          result: listing,
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
            errors,
          }),
          { status: 400 },
        ])
      })

      it("returns the validation errors if validation fails", async () => {
        const result = await validateDealerListing({
          dealerId,
          listing,
          options: {
            validationEndpoint: ListingValidationEndpoint.publish,
            ...requestOptionsMock,
          },
        })

        expect(result).toEqual({
          tag: "error",
          message,
          errors,
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
          listing,
          options: requestOptionsMock,
        })

        expect(fetchMock).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ method: "POST" })
        )
      })

      it("returns the listing", async () => {
        const result = await saveDealerListing({
          dealerId: 1234,
          listing,
          options: requestOptionsMock,
        })

        expect(result).toEqual({
          tag: "success",
          result: { ...listing, id: 123 },
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
          listing,
          options: requestOptionsMock,
        })

        expect(fetchMock).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ method: "PUT" })
        )
      })

      it("returns the listing", async () => {
        const result = await saveDealerListing({
          dealerId: 1234,
          listing,
          options: requestOptionsMock,
        })

        expect(result).toEqual({ tag: "success", result: listing })
      })
    })
  })

  describe("#publishDealerListing", () => {
    const listing = Listing({ id: 123 })

    it("publishes and returns the listing", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await publishDealerListing({
        dealerId: 6,
        listing,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "success", result: listing })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/6/listings/123/publish"),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "price", message: "validation.field.not-empty" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await publishDealerListing({
        dealerId: 6,
        listing,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "error", message, errors })
    })
  })

  describe("#archiveDealerListing", () => {
    it("archives the listing", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await archiveDealerListing({
        dealerId: 6,
        listingId: 123,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/6/listings/123/archive"),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "price", message: "validation.field.not-empty" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await archiveDealerListing({
        dealerId: 6,
        listingId: 123,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "error", message, errors })
    })
  })

  describe("#unpublishDealerListing", () => {
    it("un-publishes the listing", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await unpublishDealerListing({
        dealerId: 6,
        listingId: 123,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/6/listings/123/unpublish"),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "price", message: "validation.field.not-empty" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await unpublishDealerListing({
        dealerId: 6,
        listingId: 123,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "error", message, errors })
    })
  })

  describe("#transferDealerListingToManual", () => {
    it("transfers the listing to manual the listing", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await transferDealerListingToManual({
        dealerId: 6,
        listingId: 123,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/6/listings/123/transfer-to-manual"),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "price", message: "validation.field.not-empty" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await transferDealerListingToManual({
        dealerId: 6,
        listingId: 123,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "error", message, errors })
    })
  })

  describe("#hideImportedListing", () => {
    it("hides an imported listing", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await hideListing({
        dealerId: 6,
        listingId: 123,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/6/listings/123/hide"),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "price", message: "validation.field.not-empty" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await hideListing({
        dealerId: 6,
        listingId: 123,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "error", message, errors })
    })
  })

  describe("#unhideImportedListing", () => {
    it("unhides an imported listing", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await unhideListing({
        dealerId: 6,
        listingId: 123,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/6/listings/123/unhide"),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "price", message: "validation.field.not-empty" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await unhideListing({
        dealerId: 6,
        listingId: 123,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "error", message, errors })
    })
  })

  describe("#listingMandatoryFields", () => {
    it("returns a set of mandatory fields", async () => {
      const fields = ["makeKey", "modelKey"]
      fetchMock.mockResponse(
        JSON.stringify(
          fields.map((field) => ({ message: "not-empty", param: field }))
        )
      )

      const data = await listingMandatoryFields({
        dealerId: 123,
        options: requestOptionsMock,
      })
      expect(data).toEqual(new Set(fields))
    })
  })
})
