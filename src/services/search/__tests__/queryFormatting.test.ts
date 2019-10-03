import { fetchListings } from "../listingSearch"

import { postData, Service } from "../../../base"

jest.mock("../../../base", () => ({
  ...jest.requireActual("../../../base"),
  postData: jest.fn()
}))

describe("SEARCH service", () => {
  describe("#fetchListings", () => {
    describe("query formatting", () => {
      it("forwards the filters as query", async () => {
        await fetchListings({
          bodyType: ["suv"],
          makeKey: ["bmw"],
          modelKey: ["m3"]
        })

        expect(postData).toHaveBeenCalledWith(
          Service.SEARCH,
          "listings/search",
          expect.objectContaining({
            query: {
              bodyType: ["suv"],
              makeKey: ["bmw"],
              modelKey: ["m3"]
            }
          })
        )
      })

      it("wraps the pagination indexed from 0", async () => {
        await fetchListings({ page: 5, size: 10 })

        expect(postData).toHaveBeenCalledWith(
          Service.SEARCH,
          "listings/search",
          expect.objectContaining({
            pagination: {
              page: 4,
              size: 10
            }
          })
        )
      })

      it("defaults `page` to 0 when it's not a number", async () => {
        await fetchListings({ page: "qwerty", size: 10 })

        expect(postData).toHaveBeenCalledWith(
          Service.SEARCH,
          "listings/search",
          expect.objectContaining({
            pagination: {
              page: 0,
              size: 10
            }
          })
        )
      })

      it("defaults `size` to 25 when it's not a number", async () => {
        await fetchListings({ page: 5, size: "qwerty" })

        expect(postData).toHaveBeenCalledWith(
          Service.SEARCH,
          "listings/search",
          expect.objectContaining({
            pagination: {
              page: 4,
              size: 25
            }
          })
        )
      })

      it("provides default pagination", async () => {
        await fetchListings()

        expect(postData).toHaveBeenCalledWith(
          Service.SEARCH,
          "listings/search",
          expect.objectContaining({
            pagination: {
              page: 0,
              size: 25
            }
          })
        )
      })

      it("wraps sort", async () => {
        await fetchListings({ sortType: "PRICE", sortOrder: "ASC" })

        expect(postData).toHaveBeenCalledWith(
          Service.SEARCH,
          "listings/search",
          expect.objectContaining({
            sort: [
              {
                type: "PRICE",
                order: "ASC"
              }
            ]
          })
        )
      })

      it("provides a default sort", async () => {
        await fetchListings()

        expect(postData).toHaveBeenCalledWith(
          Service.SEARCH,
          "listings/search",
          expect.objectContaining({
            sort: [
              {
                type: "RELEVANCE",
                order: "ASC"
              }
            ]
          })
        )
      })
    })
  })
})
