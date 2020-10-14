import { fetchListings } from "../listingSearch"

import { postData } from "../../../base"

jest.mock("../../../base", () => ({
  ...jest.requireActual("../../../base"),
  postData: jest.fn(() => ({
    content: [],
  })),
}))

describe("SEARCH service", () => {
  describe("#fetchListings", () => {
    describe("query formatting", () => {
      it("forwards the filters as query", async () => {
        await fetchListings({
          query: {
            bodyType: ["suv"],
            makeKey: ["bmw"],
            modelKey: ["m3"],
          },
        })

        expect(postData).toHaveBeenCalledWith({
          path: "listings/search",
          body: expect.objectContaining({
            query: {
              bodyType: ["suv"],
              makeKey: ["bmw"],
              modelKey: ["m3"],
            },
          }),
          options: {},
        })
      })

      it("wraps the pagination indexed from 0", async () => {
        await fetchListings({ query: { page: 5, size: 10 } })

        expect(postData).toHaveBeenCalledWith({
          path: "listings/search",
          body: expect.objectContaining({
            pagination: {
              page: 4,
              size: 10,
            },
          }),
          options: {},
        })
      })

      it("defaults `page` to 0 when it's not a number", async () => {
        await fetchListings({
          query: { page: ("qwerty" as unknown) as number, size: 10 },
        })

        expect(postData).toHaveBeenCalledWith({
          path: "listings/search",
          body: expect.objectContaining({
            pagination: {
              page: 0,
              size: 10,
            },
          }),
          options: {},
        })
      })

      it("defaults `size` to 24 when it's not a number", async () => {
        await fetchListings({
          query: { page: 5, size: ("qwerty" as unknown) as number },
        })

        expect(postData).toHaveBeenCalledWith({
          path: "listings/search",
          body: expect.objectContaining({
            pagination: {
              page: 4,
              size: 24,
            },
          }),
          options: {},
        })
      })

      it("provides default pagination", async () => {
        await fetchListings()

        expect(postData).toHaveBeenCalledWith({
          path: "listings/search",
          body: expect.objectContaining({
            pagination: {
              page: 0,
              size: 24,
            },
          }),
          options: {},
        })
      })

      it("wraps sort", async () => {
        await fetchListings({ query: { sortType: "PRICE", sortOrder: "ASC" } })

        expect(postData).toHaveBeenCalledWith({
          path: "listings/search",
          body: expect.objectContaining({
            sort: [
              {
                type: "PRICE",
                order: "ASC",
              },
            ],
          }),
          options: {},
        })
      })

      it("provides a default sort", async () => {
        await fetchListings()

        expect(postData).toHaveBeenCalledWith({
          path: "listings/search",
          body: expect.objectContaining({
            sort: [
              {
                type: "RELEVANCE",
                order: "ASC",
              },
            ],
          }),
          options: {},
        })
      })
    })
  })
})
