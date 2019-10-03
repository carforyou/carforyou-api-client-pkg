import { fetchListingOptions } from "../listing"

describe("OPTION service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchListingOptions", () => {
    const options = {
      standardOptions: [
        { de: "option a DE", fr: "option a EN", it: "option a IT" }
      ],
      additionalOptions: [
        { de: "option a DE", fr: "option a EN", it: "option a IT" }
      ]
    }

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(options))
    })

    it("returns ListingOptions", async () => {
      const fetchedOptions = await fetchListingOptions(10)

      expect(fetch).toHaveBeenCalled()
      expect(fetchedOptions).toEqual(options)
    })
  })
})
