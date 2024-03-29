import { fetchDealers } from "../dealerSearch"
import { DealerSortTypeParams } from "../../../types/sort"
import { Feature } from "../../../types/models/product"
import PaginatedFactory from "../../../lib/factories/paginated"
import { SearchDealer } from "../../../lib/factories/dealer"

describe("SEARCH service", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const sort = { type: DealerSortTypeParams.ROTATION, seed: 1 }
  const query = { feature: [Feature.garagePromotion] }

  describe("#fetchDealers", () => {
    const { content, pagination } = PaginatedFactory([SearchDealer()])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content: content.map((dealerPromotion) => ({
            ...dealerPromotion,
          })),
          ...pagination,
        })
      )
    })

    it("unwraps the content from json", async () => {
      const paginatedListings = await fetchDealers({
        searchQuery: { sort, pagination, query },
      })
      const dealerPromotion = paginatedListings.content

      expect(dealerPromotion.length).toEqual(1)
      expect(dealerPromotion).toEqual(content)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/search"),
        expect.objectContaining({
          body: JSON.stringify({
            pagination: { page: 0, size: 1 },
            sort: [{ type: "ROTATION", seed: 1 }],
            query: { feature: [Feature.garagePromotion] },
          }),
        })
      )
    })

    it("previewId - add correct sort", async () => {
      const paginatedListings = await fetchDealers({
        searchQuery: { sort, pagination, query },
        previewId: 1316,
      })
      const dealerPromotion = paginatedListings.content

      expect(dealerPromotion.length).toEqual(1)
      expect(dealerPromotion).toEqual(content)

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/search"),
        expect.objectContaining({
          body: JSON.stringify({
            pagination: { page: 0, size: 1 },
            sort: [
              {
                type: DealerSortTypeParams.PREVIEW,
                previewId: 1316,
              },
              { type: "ROTATION", seed: 1 },
            ],
            query: { feature: [Feature.garagePromotion] },
          }),
        })
      )
    })

    describe("Pagination", () => {
      it("is unwrapped from json", async () => {
        const paginatedListings = await fetchDealers({
          searchQuery: {
            sort,
            pagination,
            query,
          },
        })

        expect(paginatedListings.pagination).toEqual(pagination)
        expect(fetch).toHaveBeenCalled()
      })
    })
  })
})
