import {
  deleteFavourite,
  fetchFavourites,
  saveFavourite,
  saveFavourites,
} from "../favourites"

describe("Favourites", () => {
  beforeEach(fetchMock.mockClear)

  describe("fetchFavourites", () => {
    it("calls the api", async () => {
      await fetchFavourites({
        options: { accessToken: "Let me in, please." },
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/users/me/favorite-listings",
        expect.any(Object)
      )
    })
  })

  describe("saveFavourite", () => {
    it("calls the api", async () => {
      await saveFavourite({
        listingId: 123,
        options: { accessToken: "Let me in, please." },
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/users/me/favorite-listings",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            listingId: 123,
          }),
        })
      )
    })
  })

  describe("saveFavourites", () => {
    it("calls the api", async () => {
      await saveFavourites({
        listingIds: [123, 456],
        options: { accessToken: "Let me in, please." },
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/users/me/favorite-listings",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            elements: [{ listingId: 123 }, { listingId: 456 }],
          }),
        })
      )
    })
  })

  describe("deleteFavourite", () => {
    it("calls the api", async () => {
      await deleteFavourite({
        favouriteId: 123,
        options: { accessToken: "Let me in, please." },
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/users/me/favorite-listings/123",
        expect.objectContaining({
          method: "DELETE",
        })
      )
    })
  })
})
