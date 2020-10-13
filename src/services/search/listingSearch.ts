import { fetchPath, postData, Service } from "../../base"

import { Paginated } from "../../types/pagination"
import { WithFieldStats, FieldsStats } from "../../types/fieldStats"
import {
  ListingSearchParams,
  ListingQueryParams,
} from "../../types/params/listings"
import { ListingSortTypeParams, ListingSortOrderParams } from "../../types/sort"
import { SearchListing, ApiSearchListing } from "../../types/models/listing"
import { WithTopListing } from "../../types/topListing"

import { decodeDate } from "../../lib/dateEncoding"
import { sizeOrDefault, pageOrDefault } from "../../lib/pageParams"

import paramsToSearchRequest from "../../lib/paramsToSearchRequest"
import toQueryString from "../../lib/toQueryString"

export const fetchListingCount = async (
  query: ListingSearchParams = {},
  options = {}
): Promise<{ count: number; fieldsStats?: FieldsStats }> => {
  const { fieldsStats } = {
    fieldsStats: [],
    ...options,
  }
  const json = await postData({
    service: Service.SEARCH,
    path: "listings/count",
    body: {
      query,
      ...(fieldsStats.length > 0 ? { includeFieldsStats: fieldsStats } : {}),
    },
  })

  return {
    count: json.count,
    ...(fieldsStats.length > 0 ? { fieldsStats: json.fieldsStats } : {}),
  }
}

export const defaultSort = {
  sortType: ListingSortTypeParams.RELEVANCE,
  sortOrder: ListingSortOrderParams.ASC,
}

const defaultPagination = {
  page: 0,
  size: 24,
}

const searchForListings = (
  path,
  query: ListingQueryParams = {},
  options: {
    includeFieldsStats?: string[]
    includeTopListing?: boolean
  } = {}
) => {
  const { page, size, sortOrder, sortType, ...rest } = query

  const paginationSize = sizeOrDefault(size, defaultPagination)
  const paginationPage = pageOrDefault(page, defaultPagination)

  const body = {
    pagination: {
      page: paginationPage,
      size: paginationSize,
    },
    sort: [
      {
        order: sortOrder || defaultSort.sortOrder,
        type: sortType || defaultSort.sortType,
      },
    ],
    ...(options.includeFieldsStats && options.includeFieldsStats.length > 0
      ? { includeFieldsStats: options.includeFieldsStats }
      : {}),
    ...(options.includeTopListing ? { includeTopListing: true } : {}),
    query: paramsToSearchRequest(rest),
  }

  return postData({ service: Service.SEARCH, path, body })
}

function sanitizeListingResponse<
  T extends Paginated<ApiSearchListing> & { topListing: ApiSearchListing }
>({
  content,
  topListing,
  ...rest
}: T): WithTopListing<Paginated<SearchListing>> {
  return {
    ...rest,
    ...(topListing && {
      topListing: {
        ...topListing,
        firstRegistrationDate: decodeDate(topListing.firstRegistrationDate),
      },
    }),
    content: content.map((listing) => ({
      ...listing,
      firstRegistrationDate: decodeDate(listing.firstRegistrationDate),
    })),
  }
}

export const fetchListings = async (
  query: ListingQueryParams = {},
  options = {}
): Promise<WithFieldStats<WithTopListing<Paginated<SearchListing>>>> => {
  const response = await searchForListings("listings/search", query, options)

  return sanitizeListingResponse(response)
}

export const fetchNeedsAssesmentListings = async (
  query: ListingQueryParams = {},
  options = {}
): Promise<WithFieldStats<Paginated<SearchListing>>> => {
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
  const response = await fetchPath({
    service: Service.CAR,
    path: `dealers/${dealerId}/mbg-listings?${toQueryString(query)}`,
  })

  return sanitizeListingResponse(response)
}
