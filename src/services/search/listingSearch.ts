import { postData, Service } from "../../base"

import { WithFacets, Facets } from "../../types/facets"
import { Paginated } from "../../types/pagination"
import { WithFieldStats, FieldsStats } from "../../types/fieldStats"
import { SearchParams, QueryParams, LocationFilter } from "../../types/params/listings"
import { SortTypeParams, SortOrderParams } from "../../types/sort"
import { SearchListing } from "../../types/models/listing"

export const fetchListingCount = async (
  query: SearchParams = {},
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
  sortType: SortTypeParams.RELEVANCE,
  sortOrder: SortOrderParams.ASC
}

const defaultPagination = {
  page: 0,
  size: 25
}

const searchForListings = (
  path,
  query: QueryParams = {},
  options: { includeFacets?: boolean; includeFieldsStats?: string[] } = {}
) => {
  const { page, size, sortOrder, sortType, zipCode, radius, ...rest } = query
  const sizeOrDefault =
    parseInt((size || "").toString(), 10) || defaultPagination.size
  const pageOrDefault =
    parseInt((page || "").toString(), 10) - 1 || defaultPagination.page

  const location: LocationFilter =
    zipCode && radius ? { zipCode, radius } : zipCode ? { zipCode } : undefined

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
    query: { ...rest, ...(location ? { location } : {}) }
  }

  return postData(Service.SEARCH, path, body)
}

export const fetchListings = (
  query: QueryParams = {},
  options = {}
): Promise<WithFacets<WithFieldStats<Paginated<SearchListing>>>> =>
  searchForListings("listings/search", query, options)

export const fetchNeedsAssesmentListings = (
  query: QueryParams = {},
  options = {}
): Promise<WithFacets<WithFieldStats<Paginated<SearchListing>>>> =>
  searchForListings("listings/needs-assessment/search", query, options)
