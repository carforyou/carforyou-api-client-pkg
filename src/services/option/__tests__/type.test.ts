import { fetchTypeOptions } from "../type"

describe("OPTION service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchTypeOptions", () => {
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
      const fetchedOptions = await fetchTypeOptions({
        typeId: 10,
        query: {
          language: "de",
          productionYear: 1988,
        },
      })

      expect(fetch).toHaveBeenCalled()
      expect(fetchedOptions).toEqual(options)
    })
  })
})
