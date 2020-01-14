import { fetchPath, postData, Service } from "../../base"

import { WithFacets, Facets } from "../../types/facets"
import { Paginated } from "../../types/pagination"
import { WithFieldStats, FieldsStats } from "../../types/fieldStats"
import {
  ListingSearchParams,
  ListingQueryParams
} from "../../types/params/listings"
import { ListingSortTypeParams, ListingSortOrderParams } from "../../types/sort"
import { SearchListing } from "../../types/models/listing"

import { decodeDate } from "../../lib/dateEncoding"
import paramsToSearchRequest from "../../lib/paramsToSearchRequest"
import toQueryString from "../../lib/toQueryString"
import { SearchListing } from "lib/factories/listing"

export const fetchListingCount = async (
  query: ListingSearchParams = {},
  options = {}
): Promise<{ count: number; facets?: Facets; fieldsStats?: FieldsStats }> => {
  const { includeFacets, fieldsStats } = {
    includeFacets: true,
    fieldsStats: [],
    ...options
  }
  const json = await postData(Service.SEARCH, "listings/count", {
    query,
    includeFacets,
    ...(fieldsStats.length > 0 ? { includeFieldsStats: fieldsStats } : {})
  })

  return {
    count: json.count,
    ...(includeFacets ? { facets: json.facets } : {}),
    ...(fieldsStats.length > 0 ? { fieldsStats: json.fieldsStats } : {})
  }
}

export const defaultSort = {
  sortType: ListingSortTypeParams.RELEVANCE,
  sortOrder: ListingSortOrderParams.ASC
}

const defaultPagination = {
  page: 0,
  size: 24
}

const searchForListings = (
  path,
  query: ListingQueryParams = {},
  options: { includeFacets?: boolean; includeFieldsStats?: string[] } = {}
) => {
  const { page, size, sortOrder, sortType, ...rest } = query
  const sizeOrDefault =
    parseInt((size || "").toString(), 10) || defaultPagination.size
  const pageOrDefault =
    parseInt((page || "").toString(), 10) - 1 || defaultPagination.page

  const body = {
    pagination: {
      page: pageOrDefault,
      size: sizeOrDefault
    },
    sort: [
      {
        order: sortOrder || defaultSort.sortOrder,
        type: sortType || defaultSort.sortType
      }
    ],
    ...(options.includeFacets ? { includeFacets: true } : {}),
    ...(options.includeFieldsStats && options.includeFieldsStats.length > 0
      ? { includeFieldsStats: options.includeFieldsStats }
      : {}),
    query: paramsToSearchRequest(rest)
  }

  return postData(Service.SEARCH, path, body)
}

function sanitizeListingResponse<T extends Paginated<SearchListing>>({
  content,
  ...rest
}: any): T {
  return {
    ...rest,
    content: content.map(listing => ({
      ...listing,
      firstRegistrationDate: decodeDate(listing.firstRegistrationDate)
    }))
  }
}

export const fetchListings = async (
  query: ListingQueryParams = {},
  options = {}
): Promise<WithFacets<WithFieldStats<Paginated<SearchListing>>>> => {
  const response = await searchForListings("listings/search", query, options)

  return sanitizeListingResponse(response)
}

export const fetchNeedsAssesmentListings = async (
  query: ListingQueryParams = {},
  options = {}
): Promise<WithFacets<WithFieldStats<Paginated<SearchListing>>>> => {
  const response = await searchForListings(
    "listings/needs-assessment/search",
    query,
    options
  )

  return sanitizeListingResponse(response)
}

export const fetchMoneybackListings = async (
  dealerId: number,
  query?: {
    makeKey: string
    size: number
    page: number
  }
): Promise<Paginated<SearchListing>> => {
  const response = await fetchPath(
    Service.CAR,
    `dealers/${dealerId}/mbg-listings?${toQueryString(query)}`
  )

  return sanitizeListingResponse(response)
}
