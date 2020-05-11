import { fetchPath, Service, handleValidationError } from "../base"

import { Paginated } from "../types/pagination"
import { WithValidationError } from "../types/withValidationError"
import { Make, Model } from "../types/models"
import { SearchType, Type } from "../types/models/type"
import { SearchTypeQueryParams } from "../types/params/types"

import toQueryString from "../lib/toQueryString"
import { encodeDate } from "../lib/dateEncoding"

export const fetchMakes = (): Promise<Make[]> => {
  return fetchPath(Service.CATALOGUE, "makes")
}

export const fetchModels = (makeKey: string): Promise<Model[]> => {
  return fetchPath(Service.CATALOGUE, `makes/key/${makeKey}/models`)
}

const defaultPagination = {
  page: 0,
  size: 25,
}

export const fetchTypes = async ({
  firstRegistrationDate,
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

  const encodedDate = encodeDate(firstRegistrationDate)

  const params = {
    ...query,
    ...(encodedDate ? { firstRegistrationDate: encodedDate } : {}),
    page: pageOrDefault,
    size: sizeOrDefault,
  }

  const queryString = params ? toQueryString(params) : ""

  try {
    const result = await fetchPath(
      Service.CATALOGUE,
      `types${queryString ? `?${queryString}` : ""}`
    )
    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const fetchType = (id: number): Promise<Type> => {
  return fetchPath(Service.CATALOGUE, `types/${id}`)
}
