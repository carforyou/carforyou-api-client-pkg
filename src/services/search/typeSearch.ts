import { WithValidationError } from "../../types/withValidationError"
import { SearchTypeQueryParams } from "../../types/params/types"
import { Paginated } from "../../types/pagination"

import { SearchType } from "../../types/models/type"
import { Facets } from "../../types/facets"
import { ApiCallOptions, handleValidationError, postData } from "../../base"
import { Facet } from "./facets"

const defaultPagination = {
  page: 0,
  size: 25,
}

const getPowerFilters = (power) => {
  const { unit, value } = power || {}

  if (!unit || !value) {
    return {}
  }

  return { [`${unit}From`]: value, [`${unit}To`]: value }
}

const sanitizeQuery = ({
  power,
  gears,
  tsn,
  ...rest
}: SearchTypeQueryParams) => {
  return {
    ...rest,
    ...getPowerFilters(power),
    ...(gears ? { gearsFrom: gears, gearsTo: gears } : {}),
    ...(tsn ? { tsn: tsn.replace(/\s/g, "") } : {}),
  }
}

export const fetchTypes = async ({
  query: { page, size, ...searchQuery } = {},
  options = {},
}: {
  query?: SearchTypeQueryParams
  options?: ApiCallOptions
} = {}): Promise<WithValidationError<Paginated<SearchType>>> => {
  const sizeOrDefault =
    parseInt((size || "").toString(), 10) || defaultPagination.size
  const pageOrDefault =
    parseInt((page || "").toString(), 10) - 1 || defaultPagination.page

  try {
    const result = await postData({
      path: "types/search",
      body: {
        query: sanitizeQuery(searchQuery),
        pagination: {
          page: pageOrDefault,
          size: sizeOrDefault,
        },
      },
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const fetchTypeFacets = async ({
  query = {},
  facets = [],
  options = {},
}: {
  query?: SearchTypeQueryParams
  facets?: Facet[]
  options?: ApiCallOptions
} = {}): Promise<WithValidationError<Facets>> => {
  try {
    const result = await postData({
      path: "types/facets",
      body: {
        query: sanitizeQuery(query),
        facets,
      },
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })

    return {
      tag: "success",
      result: result.facets,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
