import {
  archiveDealerListing,
  fetchDealerMakes,
  fetchListing,
  hideListing,
  listingMandatoryFields,
  ListingValidationEndpoint,
  prepareListingData,
  publishDealerListing,
  saveDealerListing,
  transferDealerListingsToManual,
  transferDealerListingToManual,
  unhideListing,
  unpublishDealerListing,
  validateDealerListing,
} from "../inventory"

import { EmptyListing, Listing } from "../../../lib/factories/listing"
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
          globalErrors: [],
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
      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
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
      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
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
      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })

  describe("#transferDealerListingToManual", () => {
    it("transfers the listing to manual", async () => {
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
      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })

  describe("#transfersDealerListingToManual", () => {
    it("transfers multiple listings to manual", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))
      const listingIds = [123, 456]
      const response = await transferDealerListingsToManual({
        dealerId: 6,
        listingIds,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/6/listings/transfer-to-manual"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ elements: listingIds }),
        })
      )
    })

    it("handles validation error", async () => {
      const message = "bulk-execute-action-failed"
      const errors = [{ param: "123", message: "listing is manual already" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await transferDealerListingsToManual({
        dealerId: 6,
        listingIds: [123],
        options: requestOptionsMock,
      })
      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
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
      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
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
      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
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
