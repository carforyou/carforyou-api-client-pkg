import { WithTopListing } from "../../types/topListing"
import {
  ListingSortTypeParams,
  SortOrderParams,
  SortParams,
} from "../../types/sort"
import {
  ListingQueryParams,
  ListingSearchParams,
} from "../../types/params/listings"
import { PaginationParams } from "../../types/params"
import { Paginated } from "../../types/pagination"
import { ApiSearchListing, SearchListing } from "../../types/models/listing"
import { FieldsStats, WithFieldStats } from "../../types/fieldStats"

import toQueryString from "../../lib/toQueryString"
import paramsToSearchRequest from "../../lib/paramsToSearchRequest"
import { pageOrDefault, sizeOrDefault } from "../../lib/pageParams"
import { decodeDate } from "../../lib/dateEncoding"
import { toSpringSortParams } from "../../lib/convertParams"

import { ApiCallOptions, fetchPath, postData } from "../../base"

export const fetchListingCount = async ({
  query = {},
  options = {},
}: {
  query?: ListingSearchParams
  options?: ApiCallOptions & { fieldsStats?: string[] }
} = {}): Promise<{ count: number; fieldsStats?: FieldsStats }> => {
  const { fieldsStats = [], ...otherOptions } = options

  const json = await postData({
    path: "listings/count",
    body: {
      query: paramsToSearchRequest(query),
      ...(fieldsStats.length > 0 ? { includeFieldsStats: fieldsStats } : {}),
    },
    options: otherOptions,
  })

  return {
    count: json.count,
    ...(fieldsStats.length > 0 ? { fieldsStats: json.fieldsStats } : {}),
  }
}

export const fetchDealerListingsCount = async ({
  dealerId,
  query = {},
  options = {},
}: {
  dealerId: number
  query?: ListingSearchParams
  options?: ApiCallOptions
}): Promise<number> => {
  const { count } = await postData({
    path: `dealers/${dealerId}/listings/count`,
    body: {
      query,
    },
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

  return count
}

export const fetchDealerArchivedListingsCount = async ({
  dealerId,
  options,
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<number> => {
  const { count } = await fetchPath({
    path: `dealers/${dealerId}/archived-listings/count`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

  return count
}

export const defaultUserSort = {
  sortType: ListingSortTypeParams.RELEVANCE,
  sortOrder: SortOrderParams.ASC,
}

export const defaultDealerSort = {
  sortType: ListingSortTypeParams.NEWEST,
  sortOrder: SortOrderParams.ASC,
}

export const defaultUserPagination = {
  page: 0,
  size: 24,
}

export const defaultDealerPagination = {
  page: 0,
  size: 25,
}

const searchForListings = ({
  path,
  query = {},
  options = {},
  defaultSort,
  defaultPagination,
}: {
  path: string
  query?: ListingQueryParams
  options: ApiCallOptions & {
    includeFieldsStats?: string[]
    includeTopListing?: boolean
    isAuthorizedRequest?: boolean
  }
  defaultSort: SortParams<ListingSortTypeParams>
  defaultPagination: PaginationParams
}) => {
  const {
    page,
    size,
    sortOrder,
    sortType,
    variant,
    userInfo = {},
    ...rest
  } = query
  const {
    includeFieldsStats = [],
    includeTopListing = false,
    ...otherOptions
  } = options

  const paginationSize = sizeOrDefault(size, defaultPagination)
  const paginationPage = pageOrDefault(page, defaultPagination)
  const type = sortType || defaultSort.sortType
  const body = {
    pagination: {
      page: paginationPage,
      size: paginationSize,
    },
    sort: [
      {
        order: sortOrder || defaultSort.sortOrder,
        type,
        ...(variant && type === ListingSortTypeParams.RELEVANCE && { variant }),
      },
    ],
    ...(includeFieldsStats && includeFieldsStats.length > 0
      ? { includeFieldsStats }
      : {}),
    ...(includeTopListing ? { includeTopListing: true } : {}),
    userInfo,
    query: paramsToSearchRequest(rest),
  }

  return postData({ path, body, options: otherOptions })
}

const sanitizeListing = ({
  firstRegistrationDate,
  ...listing
}: ApiSearchListing): SearchListing => ({
  ...listing,
  firstRegistrationDate: decodeDate(firstRegistrationDate),
})

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
      topListing: sanitizeListing(topListing),
    }),
    content: content.map(sanitizeListing),
  }
}

export const fetchListings = async ({
  query = {},
  options = {},
}: {
  query?: ListingQueryParams
  options?: ApiCallOptions & {
    includeFieldsStats?: string[]
    includeTopListing?: boolean
  }
} = {}): Promise<WithFieldStats<WithTopListing<Paginated<SearchListing>>>> => {
  const response = await searchForListings({
    path: "listings/search",
    query,
    options,
    defaultSort: defaultUserSort,
    defaultPagination: defaultUserPagination,
  })

  return sanitizeListingResponse(response)
}

export const fetchDealerListings = async ({
  dealerId,
  query = {},
  options = {},
}: {
  dealerId: number
  query?: ListingQueryParams
  options?: ApiCallOptions
}): Promise<Paginated<SearchListing>> => {
  const response = await searchForListings({
    path: `dealers/${dealerId}/listings/search`,
    query,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
    defaultSort: defaultDealerSort,
    defaultPagination: defaultDealerPagination,
  })

  return sanitizeListingResponse(response)
}

export const fetchDealerArchivedListings = async ({
  dealerId,
  query = {},
  options = {},
}: {
  dealerId: number
  query?: SortParams<ListingSortTypeParams> & PaginationParams
  options?: ApiCallOptions
}): Promise<Paginated<SearchListing>> => {
  const { page, size, sortOrder, sortType } = query

  const sortOrDefault = {
    sortType: sortType || defaultDealerSort.sortType,
    sortOrder: sortOrder || defaultDealerSort.sortOrder,
  }

  const queryParams = {
    page: pageOrDefault(page, defaultDealerPagination),
    size: sizeOrDefault(size, defaultDealerPagination),
    sort: toSpringSortParams(sortOrDefault),
  }

  const { content, ...response } = await fetchPath({
    path: `dealers/${dealerId}/archived-listings?${toQueryString(queryParams)}`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

  return {
    ...response,
    content: content.map(sanitizeListing),
  }
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
  options?: ApiCallOptions
}): Promise<Paginated<SearchListing>> => {
  const response = await fetchPath({
    path: `dealers/${dealerId}/mbg-listings?${toQueryString(query)}`,
    options,
  })

  return sanitizeListingResponse(response)
}
