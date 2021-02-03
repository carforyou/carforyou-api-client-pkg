import {
  fetchDealerArchivedListings,
  fetchDealerListings,
  fetchListings,
} from "../listingSearch"

import {
  ListingSortOrderParams,
  ListingSortTypeParams,
} from "../../../types/sort"
import { fetchPath, postData } from "../../../base"

jest.mock("../../../base", () => ({
  ...jest.requireActual("../../../base"),
  postData: jest.fn(() => ({
    content: [],
  })),
  fetchPath: jest.fn(() => ({
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
          options: expect.any(Object),
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

  describe("#fetchDealerListings", () => {
    const dealerId = 123
    const requestOptionsMock = {
      accessToken: "DUMMY TOKEN",
    }

    describe("query formatting", () => {
      describe("pagination", () => {
        it("indexes page from 0", async () => {
          await fetchDealerListings({
            dealerId,
            query: { page: 5, size: 10 },
            options: requestOptionsMock,
          })

          expect(postData).toHaveBeenCalledWith({
            path: "dealers/123/listings/search",
            body: expect.objectContaining({
              pagination: {
                page: 4,
                size: 10,
              },
            }),
            options: expect.any(Object),
          })
        })

        it("defaults `page` to 0 when not provided", async () => {
          await fetchDealerListings({
            dealerId,
            query: {
              size: 10,
            },
            options: requestOptionsMock,
          })

          expect(postData).toHaveBeenCalledWith({
            path: "dealers/123/listings/search",
            body: expect.objectContaining({
              pagination: {
                page: 0,
                size: 10,
              },
            }),
            options: expect.any(Object),
          })
        })

        it("defaults `size` to 25 when it's not provided", async () => {
          await fetchDealerListings({
            dealerId,
            query: { page: 5 },
            options: requestOptionsMock,
          })

          expect(postData).toHaveBeenCalledWith({
            path: "dealers/123/listings/search",
            body: expect.objectContaining({
              pagination: {
                page: 4,
                size: 25,
              },
            }),
            options: expect.any(Object),
          })
        })
      })

      describe("sort", () => {
        it("can sort by creation date", async () => {
          await fetchDealerListings({
            dealerId,
            query: {
              sortType: "CREATED_DATE",
              sortOrder: "ASC",
            },
            options: requestOptionsMock,
          })

          expect(postData).toHaveBeenCalledWith({
            path: "dealers/123/listings/search",
            body: expect.objectContaining({
              sort: [
                {
                  type: "CREATED_DATE",
                  order: "ASC",
                },
              ],
            }),
            options: expect.any(Object),
          })
        })

        it("defaults to sorting by newest, ascending", async () => {
          await fetchDealerListings({ dealerId, options: requestOptionsMock })

          expect(postData).toHaveBeenCalledWith({
            path: "dealers/123/listings/search",
            body: expect.objectContaining({
              sort: [
                {
                  type: "NEWEST",
                  order: "ASC",
                },
              ],
            }),
            options: expect.any(Object),
          })
        })
      })
    })
  })

  describe("#fetchDealerArchivedListings", () => {
    const dealerId = 123
    const requestOptionsMock = {
      accessToken: "DUMMY TOKEN",
    }

    describe("query formatting", () => {
      describe("pagination", () => {
        it("indexes page from 0", async () => {
          await fetchDealerArchivedListings({
            dealerId,
            query: { page: 5, size: 10 },
            options: requestOptionsMock,
          })

          expect(fetchPath).toHaveBeenCalledWith(
            expect.objectContaining({
              path: expect.stringMatching(
                new RegExp(`dealers/${dealerId}/archived-listings?(.*)page=4`)
              ),
            })
          )
        })

        it("defaults `page` to 0 when not provided", async () => {
          await fetchDealerArchivedListings({
            dealerId,
            query: {
              size: 10,
            },
            options: requestOptionsMock,
          })

          expect(fetchPath).toHaveBeenCalledWith(
            expect.objectContaining({
              path: expect.stringMatching(
                new RegExp(`dealers/${dealerId}/archived-listings?(.*)page=0`)
              ),
            })
          )
        })

        it("defaults `size` to 25 when it's not provided", async () => {
          await fetchDealerArchivedListings({
            dealerId,
            query: { page: 5 },
            options: requestOptionsMock,
          })

          expect(fetchPath).toHaveBeenCalledWith(
            expect.objectContaining({
              path: expect.stringMatching(
                new RegExp(`dealers/${dealerId}/archived-listings?(.*)size=25`)
              ),
            })
          )
        })
      })

      describe("sort", () => {
        it("can sort by creation date", async () => {
          await fetchDealerArchivedListings({
            dealerId,
            query: {
              sortType: ListingSortTypeParams.NEWEST,
              sortOrder: ListingSortOrderParams.ASC,
            },
            options: requestOptionsMock,
          })

          expect(fetchPath).toHaveBeenCalledWith(
            expect.objectContaining({
              path: expect.stringMatching(
                new RegExp(
                  `dealers/${dealerId}/archived-listings?(.*)sort=createdDate%2Cdesc`
                )
              ),
            })
          )
        })

        it("defaults to sorting by creation date, descending", async () => {
          await fetchDealerArchivedListings({
            dealerId,
            options: requestOptionsMock,
          })

          expect(fetchPath).toHaveBeenCalledWith(
            expect.objectContaining({
              path: expect.stringMatching(
                new RegExp(
                  `dealers/${dealerId}/archived-listings?(.*)sort=createdDate%2Cdesc`
                )
              ),
            })
          )
        })
      })
    })
  })
})
