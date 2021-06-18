import { fetchTypeOptions } from "../type"

import { Options } from "../../../types/models"

describe("OPTION service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchTypeOptions", () => {
    const options: Options = {
      standard: [{ id: 1, name: "option 1", packageItems: [] }],
      optional: [{ id: 2, name: "option 2", packageItems: [] }],
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
