import { Service, handleValidationError, postData } from "../../base"

import { Paginated } from "../../types/pagination"
import { WithValidationError } from "../../types/withValidationError"

import { SearchType } from "../../types/models/type"
import { SearchTypeQueryParams } from "../../types/params/types"
import { Facets } from "../../types/facets"

import { encodeDate } from "../../lib/dateEncoding"

const defaultPagination = {
  page: 0,
  size: 25,
}

const sanitizeQuery = ({
  firstRegistrationDate,
  tsn,
  ...rest
}: SearchTypeQueryParams) => {
  const encodedDate = encodeDate(firstRegistrationDate)

  return {
    ...rest,
    ...(encodedDate ? { firstRegistrationDate: encodedDate } : {}),
    ...(tsn ? { tsn: tsn.replace(/\s/g, "") } : {}),
  }
}

export const fetchTypes = async ({
  page,
  size,
  ...query
}: SearchTypeQueryParams): Promise<
  WithValidationError<Paginated<SearchType>>
> => {
  const sizeOrDefault =
    parseInt((size || "").toString(), 10) || defaultPagination.size
  const pageOrDefault =
    parseInt((page || "").toString(), 10) - 1 || defaultPagination.page

  try {
    const result = await postData(Service.SEARCH, "types/search", {
      query: sanitizeQuery(query),
      pagination: {
        page: pageOrDefault,
        size: sizeOrDefault,
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
  fields: string[] = []
): Promise<WithValidationError<Facets>> => {
  try {
    const result = await postData(Service.SEARCH, "types/facets", {
      query: sanitizeQuery(query),
      fields,
    })

    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
