import * as queryStringHelper from "./../../../lib/toQueryString"
import { fetchListingQuestions } from "../questions"

describe("questions", () => {
  describe("#fetchListingQuestions", () => {
    beforeEach(() => {
      fetchMock.resetMocks()
      jest.clearAllMocks()
    })

    it("fetches the listing questions", async () => {
      await fetchListingQuestions({ listingId: 12 })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/listings\/12\/questions\?page=0&size=2&sort=createdDate%2Cdesc/
        ),
        expect.any(Object)
      )
    })

    it("uses the correct default values for pagination and sort", async () => {
      jest.spyOn(queryStringHelper, "default")
      await fetchListingQuestions({ listingId: 12 })

      expect(queryStringHelper.default).toHaveBeenCalledWith({
        page: 0,
        size: 2,
        sort: "createdDate,desc",
      })
    })

    it("allows to configure the pagination", async () => {
      jest.spyOn(queryStringHelper, "default")
      await fetchListingQuestions({
        listingId: 12,
        query: { page: 3, size: 10 },
      })

      expect(queryStringHelper.default).toHaveBeenCalledWith({
        page: 2,
        size: 10,
        sort: "createdDate,desc",
      })
    })
  })
})
