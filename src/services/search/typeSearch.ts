import {
  Service,
  handleValidationError,
  postData,
  RequestOptions,
} from "../../base"

import { Paginated } from "../../types/pagination"
import { WithValidationError } from "../../types/withValidationError"

import { SearchType } from "../../types/models/type"
import { SearchTypeQueryParams } from "../../types/params/types"
import { Facets } from "../../types/facets"

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

export const fetchTypes = async (
  { page, size, ...query }: SearchTypeQueryParams,
  options: RequestOptions
): Promise<WithValidationError<Paginated<SearchType>>> => {
  const sizeOrDefault =
    parseInt((size || "").toString(), 10) || defaultPagination.size
  const pageOrDefault =
    parseInt((page || "").toString(), 10) - 1 || defaultPagination.page

  try {
    const result = await postData({
      service: Service.SEARCH,
      path: "types/search",
      body: {
        query: sanitizeQuery(query),
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

export const fetchTypeFacets = async (
  query: SearchTypeQueryParams = {},
  fields: string[] = [],
  options: RequestOptions
): Promise<WithValidationError<Facets>> => {
  try {
    const result = await postData({
      service: Service.SEARCH,
      path: "types/facets",
      body: {
        query: sanitizeQuery(query),
        fields,
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
