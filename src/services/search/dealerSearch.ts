import { postData, handleValidationError, Service } from "../../base"

import { Paginated } from "../../types/pagination"
import { DealerParams } from "../../types/params/dealer"

import { SearchDealer } from "../../types/models/dealer"
import { WithValidationError } from "../../types/withValidationError"

const defaultPagination = {
  page: 0,
  size: 3,
}

const searchForDealers = (path, searchQuery: DealerParams) => {
  const { pagination, sort, query } = searchQuery
  const { page, size } = pagination

  const sizeOrDefault =
    parseInt((size || "").toString(), 10) || defaultPagination.size
  const pageOrDefault =
    parseInt((page || "").toString(), 10) - 1 || defaultPagination.page

  const body = {
    pagination: {
      page: pageOrDefault,
      size: sizeOrDefault,
    },
    sort: [sort],
    query,
  }

  return postData(Service.SEARCH, path, body)
}

export const fetchDealers = async (
  query: DealerParams
): Promise<WithValidationError<Paginated<SearchDealer>>> => {
  try {
    const response = await searchForDealers("dealers/search", query)

    return response
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
