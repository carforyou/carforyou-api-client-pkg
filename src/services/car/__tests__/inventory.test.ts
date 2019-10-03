import { fetchListing } from "../inventory"

import { Listing } from "../../../../__tests__/factories/listing"

describe("CAR service", () => {
  describe("fetchListing", () => {
    const listing = Listing({ id: 10 })

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(listing))
    })

    it("returns ListingAttributes", async () => {
      const fetchedListing = await fetchListing(10)

      expect(fetch).toHaveBeenCalled()
      expect(fetchedListing).toEqual(listing)
    })
  })
})
