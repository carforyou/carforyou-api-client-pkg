import { postData, Service } from "../../base"

import { WithFacets, Facets } from "../../types/facets"
import { Paginated } from "../../types/pagination"
import { WithFieldStats } from "../../types/fieldStats"
import { SearchParams, QueryParams, LocationFilter } from "../../types/params"
import { SortTypeParams, SortOrderParams } from "../../types/sort"
import { SearchListing } from "../../types/models"

export const fetchListingCount = async (
  query: SearchParams = {},
  includeFacets = true
): Promise<{ count: number; facets?: Facets }> => {
  const json = await postData(Service.SEARCH, "listings/count", {
    query
  })

  return {
    count: json.count,
    ...(includeFacets ? { facets: json.facets } : {})
  }
}

const defaultSort = {
  sortType: SortTypeParams.RELEVANCE,
  sortOrder: SortOrderParams.ASC
}

const defaultPagination = {
  page: 0,
  size: 25
}

export const fetchListings = (
  query: QueryParams = {},
  options = {}
): Promise<WithFacets<WithFieldStats<Paginated<SearchListing>>>> => {
  const { includeFacets, needsAssessment } = {
    includeFacets: false,
    needsAssessment: false,
    ...options
  }

  const {
    page,
    size,
    sortOrder,
    sortType,
    zipCode,
    radius,
    includeFieldsStats,
    ...rest
  } = query
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
    includeFacets,
    ...(includeFieldsStats ? { includeFieldsStats } : {}),
    query: { ...rest, ...(location ? { location } : {}) }
  }

  const path = needsAssessment
    ? "listings/needs-assessment/search"
    : "listings/search"

  return postData(Service.SEARCH, path, body)
}
