import {
  createListingComparison,
  deleteListingComparison,
  fetchListingComparison,
  fetchListingComparisons,
  updateListingComparison,
} from "../listingComparisons"

describe("Listing comparisons", () => {
  beforeEach(fetchMock.mockClear)

  const options = { accessToken: "Let me in, please." }

  describe("fetchListingComparisons", () => {
    it("calls the api", async () => {
      await fetchListingComparisons({
        options,
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/users/me/listing-comparisons?sort=auditMetadata.createdDate,desc",
        expect.any(Object)
      )
    })
  })

  describe("fetchListingComparison", () => {
    it("calls the api", async () => {
      await fetchListingComparison({
        id: 1,
        options,
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/users/me/listing-comparisons/1",
        expect.any(Object)
      )
    })
  })

  describe("createListingComparison", () => {
    it("calls the api", async () => {
      await createListingComparison({
        listingComparison: {
          name: "foo",
          listingIds: [1, 2, 3],
        },
        options,
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/users/me/listing-comparisons",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            name: "foo",
            listingIds: [1, 2, 3],
          }),
        })
      )
    })
  })

  describe("updateListingComparison", () => {
    it("calls the api", async () => {
      await updateListingComparison({
        listingComparison: {
          name: "foo",
          listingIds: [1, 2, 3],
          id: 1,
        },
        options,
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/users/me/listing-comparisons/1",
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({
            name: "foo",
            listingIds: [1, 2, 3],
          }),
        })
      )
    })
  })

  describe("deleteListingComparison", () => {
    it("calls the api", async () => {
      await deleteListingComparison({
        id: 1,
        options,
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/users/me/listing-comparisons/1",
        expect.objectContaining({
          method: "DELETE",
        })
      )
    })
  })
})
