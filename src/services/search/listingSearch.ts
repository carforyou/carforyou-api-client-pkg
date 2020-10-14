import { fetchPath, postData, RequestOptions } from "../../base"

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

export const fetchListingCount = async ({
  query = {},
  options = {},
}: {
  query?: ListingSearchParams
  options?: RequestOptions & { fieldsStats?: string[] }
} = {}): Promise<{ count: number; fieldsStats?: FieldsStats }> => {
  const { fieldsStats = [], ...otherOptions } = options

  const json = await postData({
    path: "listings/count",
    body: {
      query,
      ...(fieldsStats.length > 0 ? { includeFieldsStats: fieldsStats } : {}),
    },
    options: otherOptions,
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

const searchForListings = ({
  path,
  query = {},
  options = {},
}: {
  path: string
  query?: ListingQueryParams
  options: RequestOptions & {
    includeFieldsStats?: string[]
    includeTopListing?: boolean
  }
}) => {
  const { page, size, sortOrder, sortType, ...rest } = query
  const {
    includeFieldsStats = [],
    includeTopListing = false,
    ...otherOptions
  } = options

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
    ...(includeFieldsStats && includeFieldsStats.length > 0
      ? { includeFieldsStats }
      : {}),
    ...(includeTopListing ? { includeTopListing: true } : {}),
    query: paramsToSearchRequest(rest),
  }

  return postData({ path, body, options: otherOptions })
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

export const fetchListings = async ({
  query = {},
  options = {},
}: {
  query?: ListingQueryParams
  options?: RequestOptions & {
    includeFieldsStats?: string[]
    includeTopListing?: boolean
  }
} = {}): Promise<WithFieldStats<WithTopListing<Paginated<SearchListing>>>> => {
  const response = await searchForListings({
    path: "listings/search",
    query,
    options,
  })

  return sanitizeListingResponse(response)
}

export const fetchNeedsAssessmentListings = async ({
  query = {},
  options = {},
}: {
  query?: ListingQueryParams
  options?: RequestOptions & {
    includeFieldsStats?: string[]
    includeTopListing?: boolean
  }
} = {}): Promise<WithFieldStats<Paginated<SearchListing>>> => {
  const response = await searchForListings({
    path: "listings/needs-assessment/search",
    query,
    options,
  })

  return sanitizeListingResponse(response)
}

export const fetchMoneybackListings = async ({
  dealerId,
  query = {},
  options = {},
}: {
  dealerId: number
  query?: {
    makeKey?: string
    size?: number
    page?: number
  }
  options?: RequestOptions
}): Promise<Paginated<SearchListing>> => {
  const response = await fetchPath({
    path: `dealers/${dealerId}/mbg-listings?${toQueryString(query)}`,
    options,
  })

  return sanitizeListingResponse(response)
}
