import PaginatedFactory from "../../../lib/factories/paginated"
import { DealerPromotion } from "../../../lib/factories/dealer"

import { fetchDealers } from "../dealerSearch"
import { DealerSortTypeParams } from "../../../types/sort"
import { Feature } from "../../../types/models/product"

describe("SEARCH service", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const sort = { type: DealerSortTypeParams.ROTATION, seed: 1 }
  const query = { feature: [Feature.garagePromotion] }

  describe("#fetchListings", () => {
    const { content, pagination } = PaginatedFactory([DealerPromotion()])

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
      const paginatedListings = await fetchDealers({ sort, pagination, query })
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

    describe("Pagination", () => {
      it("is unwrapped from json", async () => {
        const paginatedListings = await fetchDealers({
          sort,
          pagination,
          query,
        })

        expect(paginatedListings.pagination).toEqual(pagination)
        expect(fetch).toHaveBeenCalled()
      })
    })
  })
})
