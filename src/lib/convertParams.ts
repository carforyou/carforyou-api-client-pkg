import toCamelCase from "./toCamelCase"

import { ListingSortParams, ListingSortTypeParams } from "../types/sort"

// search APIs generally use elastic search, with the exception of the archived listing search
// for the ease of use to not have a need for multiple data types we convert existing sort params
// to the ones accepted by spring
export const toSpringSortParams = (elasticSortParams: ListingSortParams) => {
  const { sortOrder, sortType } = elasticSortParams

  const convertedSortOrder = toCamelCase(sortOrder)

  switch (sortType) {
    // We use alias in elastic, field name is createdDate
    case ListingSortTypeParams.NEWEST:
      return `createdDate,${convertedSortOrder}`
    // Uses two existing fields
    case ListingSortTypeParams.MAKE_MODEL_A_Z:
      return `make,${convertedSortOrder}&model,${convertedSortOrder}`
    default:
      return `${toCamelCase(sortType)},${convertedSortOrder}`
  }
}
