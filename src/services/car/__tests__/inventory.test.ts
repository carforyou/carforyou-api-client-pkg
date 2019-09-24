import { fetchListing } from "../inventory"

import { ListingDetails } from "../../../../__tests__/factories/listing"

describe("CAR service", () => {
  describe("fetchListing", () => {
    const listing = ListingDetails({ id: 10 })

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
