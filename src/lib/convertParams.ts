import {
  ListingSortTypeParams,
  SortOrderParams,
  SortParams,
} from "../types/sort"
import toCamelCase from "./toCamelCase"

const reverseSortOrder = (sortOrder: SortOrderParams) => {
  switch (sortOrder) {
    case SortOrderParams.ASC:
      return SortOrderParams.DESC
    case SortOrderParams.DESC:
      return SortOrderParams.ASC
  }
}

// search APIs generally use elastic search, with the exception of the archived listing search
// for the ease of use to not have a need for multiple data types we convert existing sort params
// to the ones accepted by spring
export const toSpringSortParams = (
  elasticSortParams: SortParams<ListingSortTypeParams>
) => {
  const { sortOrder, sortType } = elasticSortParams
  const convertedSortOrder = toCamelCase(sortOrder)

  switch (sortType) {
    // We use alias in elastic, field name is createdDate
    case ListingSortTypeParams.NEWEST:
      return `createdDate,${toCamelCase(reverseSortOrder(sortOrder))}`
    // Uses two existing fields
    case ListingSortTypeParams.MAKE_MODEL_A_Z:
      return [`make,${convertedSortOrder}`, `model,${convertedSortOrder}`]
    default:
      return `${toCamelCase(sortType)},${convertedSortOrder}`
  }
}
