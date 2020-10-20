import { Listing } from "../../../lib/factories/listing"
import {
  fetchListingOptions,
  fetchDealerListingOptions,
  saveDealerListingOptions,
} from "../listing"

describe("OPTION service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchListingOptions", () => {
    const options = {
      standardOptions: [
        { de: "option a DE", fr: "option a EN", it: "option a IT" },
      ],
      additionalOptions: [
        { de: "option a DE", fr: "option a EN", it: "option a IT" },
      ],
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

  describe("fetchDealerListingOptions", () => {
    const options = {
      standardOptions: [
        { de: "option a DE", fr: "option a EN", it: "option a IT" },
      ],
      additionalOptions: [
        { de: "option a DE", fr: "option a EN", it: "option a IT" },
      ],
    }

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(options))
    })

    it("returns ListingOptions", async () => {
      const fetchedOptions = await fetchDealerListingOptions({
        listingId: 10,
        dealerId: 123,
      })

      expect(fetch).toHaveBeenCalled()
      expect(fetchedOptions).toEqual(options)
    })
  })

  describe("#saveDealerListingOptions", () => {
    it("sends options in the body", async () => {
      const standardOptions = [1000001, 1000002]
      const additionalOptions = [1000003, 1000004]
      const listing = Listing({ standardOptions, additionalOptions, id: 5 })

      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await saveDealerListingOptions({
        dealerId: 123,
        listing,
      })
      expect(response).toEqual({ tag: "success", result: listing })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/123/listings/5/options"),
        expect.objectContaining({
          body: JSON.stringify({
            standardOptions: standardOptions.map((id) => ({ id })),
            additionalOptions: additionalOptions.map((id) => ({ id })),
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
      })

      expect(response).toEqual({ tag: "error", message, errors })
    })
  })
})
