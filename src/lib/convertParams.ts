import toCamelCase from "./toCamelCase"

import {
  LeadSortOrderParams,
  LeadSortParams,
  LeadSortTypeParams,
  ListingSortOrderParams,
  ListingSortParams,
  ListingSortTypeParams,
} from "../types/sort"

const reverseSortOrder = (sortOrder: ListingSortOrderParams) => {
  switch (sortOrder) {
    case ListingSortOrderParams.ASC:
      return ListingSortOrderParams.DESC
    case ListingSortOrderParams.DESC:
      return ListingSortOrderParams.ASC
  }
}

// search APIs generally use elastic search, with the exception of the archived listing search
// for the ease of use to not have a need for multiple data types we convert existing sort params
// to the ones accepted by spring
export const toSpringSortParams = (elasticSortParams: ListingSortParams) => {
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

const reverseSortLeadOrder = (sortOrder: LeadSortOrderParams) => {
  switch (sortOrder) {
    case LeadSortOrderParams.ASC:
      return LeadSortOrderParams.DESC
    case LeadSortOrderParams.DESC:
      return LeadSortOrderParams.ASC
  }
}

export const toSpringSortLeadParams = (elasticSortParams: LeadSortParams) => {
  const { sortOrder, sortType } = elasticSortParams
  const convertedSortOrder = toCamelCase(sortOrder)

  switch (sortType) {
    // We use alias in elastic, field name is createdDate
    case LeadSortTypeParams.NEWEST:
      return `createdDate,${toCamelCase(reverseSortLeadOrder(sortOrder))}`
    default:
      return `${toCamelCase(sortType)},${convertedSortOrder}`
  }
}
