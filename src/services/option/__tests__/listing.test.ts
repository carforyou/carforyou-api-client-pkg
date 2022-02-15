import {
  bulkFetchListingOptions,
  fetchDealerListingOptions,
  fetchListingOptions,
  saveDealerListingOptions,
} from "../listing"
import { Options } from "../../../types/models"
import { Listing } from "../../../lib/factories/listing"

describe("OPTION service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchListingOptions", () => {
    const options: Options = {
      standard: [{ id: 1, name: "option 1", packageItems: [] }],
      optional: [{ id: 2, name: "option 2", packageItems: [] }],
    }

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(options))
    })

    it("returns ListingOptions", async () => {
      const fetchedOptions = await fetchListingOptions({
        listingId: 10,
        language: "de",
      })

      expect(fetch).toHaveBeenCalled()
      expect(fetchedOptions).toEqual(options)
    })
  })

  describe("#bulkFetchListingOptions", () => {
    it("fetches the data", async () => {
      await bulkFetchListingOptions({ listingIds: [123, 321], language: "de" })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/listings/equipment/bulk-get?language=de"),
        expect.objectContaining({
          body: expect.stringContaining('{"elements":[123,321]}'),
        })
      )
    })
  })

  describe("fetchDealerListingOptions", () => {
    const options: Options = {
      standard: [{ id: 1, name: "option 1", packageItems: [] }],
      optional: [{ id: 2, name: "option 2", packageItems: [] }],
    }

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(options))
    })

    it("returns ListingOptions", async () => {
      const fetchedOptions = await fetchDealerListingOptions({
        listingId: 10,
        dealerId: 123,
        options: { accessToken: "TOKEN" },
      })

      expect(fetch).toHaveBeenCalled()
      expect(fetchedOptions).toEqual(options)
    })
  })

  describe("#saveDealerListingOptions", () => {
    it("sends options in the body", async () => {
      const standard = [1000001, 1000002]
      const optional = [1000003, 1000004]
      const listing = Listing({ standard, optional, id: 5 })

      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await saveDealerListingOptions({
        dealerId: 123,
        listing,
        options: { accessToken: "TOKEN" },
      })
      expect(response).toEqual({ tag: "success", result: listing })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/123/listings/5/equipment"),
        expect.objectContaining({
          body: JSON.stringify({
            standard,
            optional,
          }),
        })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [
        { param: "standardOptions", error: "validations.not-empty" },
      ]

      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await saveDealerListingOptions({
        dealerId: 123,
        listing: Listing(),
        options: { accessToken: "TOKEN" },
      })

      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })
})
