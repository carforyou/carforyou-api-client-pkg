import {
  bulkFetchListing,
  bulkUnpublishDealerListings,
  fetchDealerMakes,
  fetchDealerOrAssociationMakes,
  fetchDealerOrAssociationModels,
  fetchListing,
  getAllDealerFrameNumbers,
  prepareListingData,
  publishDealerListing,
  saveDealerListing,
  transferDealerListingsToManual,
  transferDealerListingToManual,
  unpublishDealerListing,
  validateDealerListing,
} from "../inventory"
import { EmptyListing, Listing } from "../../../lib/factories/listing"
import * as dateEncoding from "../../../lib/dateEncoding"
import { ListingFactory } from "../../../index"

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
          firstRegistrationDate: dateEncoding.encodeDate(
            listing.firstRegistrationDate
          ),
          lastInspectionDate: dateEncoding.encodeDate(
            listing.lastInspectionDate
          ),
          lastServiceDate: dateEncoding.encodeDate(listing.lastServiceDate),
        })
      )
    })

    it("returns ListingAttributes", async () => {
      const fetchedListing = await fetchListing({ id: 10 })

      expect(fetch).toHaveBeenCalled()
      expect(fetchedListing).toEqual(listing)
    })
  })

  describe("#bulkFetchListing", () => {
    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify([
          { id: 123, payload: ListingFactory({ id: 123 }) },
          { id: 321, payload: ListingFactory({ id: 321 }) },
        ])
      )
    })

    it("fetches the data", async () => {
      await bulkFetchListing({ listingIds: [123, 321] })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/listings/bulk-get"),
        expect.objectContaining({
          body: expect.stringContaining('{"elements":[123,321]}'),
        })
      )
    })

    it("sanitizes the listing", async () => {
      jest.spyOn(dateEncoding, "decodeDate")
      fetchMock.mockResponse(
        JSON.stringify([
          {
            id: 123,
            payload: ListingFactory({
              id: 123,
              firstRegistrationDate: "2020-10-05",
              lastInspectionDate: "2020-05-05",
              lastServiceDate: "2018-06-05",
            }),
          },
        ])
      )
      const listings = await bulkFetchListing({ listingIds: [123, 321] })
      expect(listings[0].payload.firstRegistrationDate).toEqual({
        month: 10,
        year: 2020,
      })
      expect(listings[0].payload.lastInspectionDate).toEqual({
        month: 5,
        year: 2020,
      })
      expect(listings[0].payload.lastServiceDate).toEqual({
        month: 6,
        year: 2018,
      })
      expect(dateEncoding.decodeDate).toHaveBeenCalledTimes(3)
      expect(dateEncoding.decodeDate).toHaveBeenNthCalledWith(1, "2020-10-05")
      expect(dateEncoding.decodeDate).toHaveBeenNthCalledWith(2, "2020-05-05")
      expect(dateEncoding.decodeDate).toHaveBeenNthCalledWith(3, "2018-06-05")
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

  describe("#fetchDealerOrAssociationMakes", () => {
    it("fetches dealer data", async () => {
      const makes = [
        { make: "Audi", makeKey: "audi" },
        { make: "BMW", makeKey: "bmw" },
      ]
      fetchMock.mockResponse(JSON.stringify(makes))

      const data = await fetchDealerOrAssociationMakes({ dealerId: 123 })
      expect(data).toEqual(makes)
      expect(fetch).toHaveBeenCalled()
    })

    it("fetches association data", async () => {
      const makes = [
        { make: "Audi", makeKey: "audi" },
        { make: "BMW", makeKey: "bmw" },
      ]
      fetchMock.mockResponse(JSON.stringify(makes))

      const data = await fetchDealerOrAssociationMakes({
        association: "association123",
      })
      expect(data).toEqual(makes)
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe("#fetchDealerOrAssociationModels", () => {
    it("fetches dealer data", async () => {
      const makes = [
        { make: "Audi", makeKey: "audi" },
        { make: "BMW", makeKey: "bmw" },
      ]
      fetchMock.mockResponse(JSON.stringify(makes))

      const data = await fetchDealerOrAssociationModels({
        dealerId: 123,
        makeKey: "bmw",
      })
      expect(data).toEqual(makes)
      expect(fetch).toHaveBeenCalled()
    })

    it("fetches association data", async () => {
      const makes = [
        { make: "Audi", makeKey: "audi" },
        { make: "BMW", makeKey: "bmw" },
      ]
      fetchMock.mockResponse(JSON.stringify(makes))

      const data = await fetchDealerOrAssociationModels({
        association: "association123",
        makeKey: "bmw",
      })
      expect(data).toEqual(makes)
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe("#validateDealerListing", () => {
    const listing = Listing({ id: 123 })

    it("uses the correct endpoint to validate the listing", async () => {
      await validateDealerListing({
        dealerId,
        listing,
        options: {
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

    it("returns the listing if validation is successful", async () => {
      const result = await validateDealerListing({
        dealerId,
        listing,
        options: {
          ...requestOptionsMock,
        },
      })

      expect(result).toEqual({
        tag: "success",
        result: listing,
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

  describe("#bulkUnpublishDealerListings", () => {
    it("unpublishes listings", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))
      const listingIds = [123, 124]
      const response = await bulkUnpublishDealerListings({
        dealerId: 6,
        listingIds: listingIds,
        options: requestOptionsMock,
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/6/listings/bulk-unpublish"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            elements: listingIds,
          }),
        })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "price", message: "validation.field.not-empty" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await bulkUnpublishDealerListings({
        dealerId: 6,
        listingIds: [123, 124],
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
        expect.stringContaining("/dealers/6/listings/bulk-transfer-to-manual"),
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

  describe("#getAllDealerFrameNumbers", () => {
    it("returns all delaer frame numbers", async () => {
      const frameNumbers = ["1234", "123ABCDS", "123AB23CD"]

      fetchMock.mockResponse(JSON.stringify(frameNumbers))

      const data = await getAllDealerFrameNumbers({
        dealerId: 123,
        query: "123",
        options: requestOptionsMock,
      })
      expect(data).toEqual(frameNumbers)
    })
  })
})
