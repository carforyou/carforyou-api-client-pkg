import { ListingQuestionsSortParams } from "../../types/sort"
import { Paginated } from "../../types/pagination"
import toQueryString from "../../lib/toQueryString"
import toCamelCase from "../../lib/toCamelCase"
import { pageOrDefault, sizeOrDefault } from "../../lib/pageParams"
import {
  PaginationParams,
  Question,
  SortOrderParams,
  SortParams,
  WithValidationError,
} from "../../index"
import {
  ApiCallOptions,
  fetchPath,
  handleValidationError,
  postData,
} from "../../base"

interface ListingQuestionsQueryParams extends PaginationParams {
  sort?: SortParams<ListingQuestionsSortParams>
}

export const fetchListingQuestions = async ({
  listingId,
  query,
  options = {},
}: {
  listingId: number
  query?: ListingQuestionsQueryParams
  options?: ApiCallOptions
}): Promise<Paginated<Question>> => {
  const sortOrDefault = {
    sortType: query?.sort?.sortType || ListingQuestionsSortParams.CREATED_DATE,
    sortOrder: query?.sort?.sortOrder || SortOrderParams.DESC,
  }
  const defaultPagination = {
    page: 0,
    size: 2,
  }
  const queryParams = {
    page: pageOrDefault(query?.page, defaultPagination),
    size: sizeOrDefault(query?.size, defaultPagination),
    sort: `${toCamelCase(sortOrDefault.sortType)},${toCamelCase(
      sortOrDefault.sortOrder
    )}`,
  }
  return fetchPath({
    path: `listings/${listingId}/questions?${toQueryString(queryParams)}`,
    options: options,
  })
}

export const createQuestion = async ({
  listingId,
  question,
  options = {},
}: {
  listingId: number
  question: { question: string }
  options?: ApiCallOptions
}): Promise<WithValidationError<Question>> => {
  try {
    const response = await postData({
      path: `listings/${listingId}/questions`,
      body: question,
      options,
    })
    return {
      tag: "success",
      result: response,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
