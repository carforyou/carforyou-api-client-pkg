import { postData, ApiCallOptions } from "../../base"

import { sizeOrDefault, pageOrDefault } from "../../lib/pageParams"
import { Paginated } from "../../types/pagination"
import { DealerParams } from "../../types/params/dealer"
import { DealerSortTypeParams } from "../../types/sort"

import { SearchDealer } from "../../types/models/dealerPromotion"

const defaultPagination = {
  page: 0,
  size: 3,
}

const searchForDealers = ({
  path,
  searchQuery,
  previewId,
  options,
}: {
  path: string
  searchQuery: DealerParams
  previewId?: number
  options: ApiCallOptions
}) => {
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

  return postData({ path, body, options })
}

export const fetchDealers = async ({
  searchQuery,
  previewId,
  options = {},
}: {
  searchQuery: DealerParams
  previewId?: number
  options?: ApiCallOptions
}): Promise<Paginated<SearchDealer>> => {
  const response = await searchForDealers({
    path: "dealers/search",
    searchQuery,
    previewId,
    options,
  })
  return response
}
