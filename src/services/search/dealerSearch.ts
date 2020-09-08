import { postData, Service } from "../../base"

import { sizeOrDefault, pageOrDefault } from "../../lib/pageParams"
import { Paginated } from "../../types/pagination"
import { DealerParams } from "../../types/params/dealer"
import { DealerSortTypeParams } from "../../types/sort"

import { SearchDealer } from "../../types/models/dealerPromotion"

const defaultPagination = {
  page: 0,
  size: 3,
}

const searchForDealers = (
  path,
  searchQuery: DealerParams,
  previewId = null
) => {
  const { pagination, query } = searchQuery
  const { page, size } = pagination

  const paginationSize = sizeOrDefault(size, defaultPagination)
  const paginationPage = pageOrDefault(page, defaultPagination)

  const sort = previewId
    ? [
        {
          type: DealerSortTypeParams.PREVIEW,
          previewId,
        },
        searchQuery.sort,
      ]
    : [searchQuery.sort]

  const body = {
    pagination: {
      page: paginationPage,
      size: paginationSize,
    },
    sort,
    query,
  }

  return postData(Service.SEARCH, path, body)
}

export const fetchDealers = async (
  searchParams: DealerParams
): Promise<Paginated<SearchDealer>> => {
  const response = await searchForDealers("dealers/search", searchParams)
  return response
}
