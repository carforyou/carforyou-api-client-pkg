import PaginatedFactory from "../../../lib/factories/paginated"
import { DealerPromotion } from "../../../lib/factories/dealer"

import { fetchDealers } from "../dealerSearch"
import { DealerSortTypeParams } from "../../../types/sort"

describe("SEARCH service", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const sort = { type: DealerSortTypeParams.ROTATION, seed: 1 }
  const query = { feature: ["garage-promotion"] }

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
      const dealesPromotion = paginatedListings.content

      expect(dealesPromotion.length).toEqual(1)
      expect(dealesPromotion).toEqual(content)
      expect(fetch).toHaveBeenCalled()
    })

    describe("Pagination", () => {
      it("is unwraped from json", async () => {
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
