import { ListingQuestionsSortParams } from "../../types/sort"
import { LeadQueryParams } from "../../types/params/leads"
import { Paginated } from "../../types/pagination"
import toQueryString from "../../lib/toQueryString"
import toCamelCase from "../../lib/toCamelCase"
import { pageOrDefault, sizeOrDefault } from "../../lib/pageParams"
import {
  PaginationParams,
  Question,
  SearchQuestionLead,
  SortOrderParams,
  WithValidationError,
} from "../../index"
import {
  ApiCallOptions,
  deletePath,
  fetchPath,
  handleValidationError,
  postData,
  putData,
} from "../../base"

export const fetchListingQuestions = async ({
  listingId,
  query,
  options = {},
}: {
  listingId: number
  query?: PaginationParams
  options?: ApiCallOptions
}): Promise<Paginated<Question>> => {
  const defaultPagination = {
    page: 0,
    size: 2,
  }
  const queryParams = {
    page: pageOrDefault(query?.page, defaultPagination),
    size: sizeOrDefault(query?.size, defaultPagination),
    sort: `${toCamelCase(
      ListingQuestionsSortParams.CREATED_DATE
    )},${toCamelCase(SortOrderParams.DESC)}`,
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
  question: {
    question: string
  }
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

export const fetchDealerQuestionLeads = async ({
  dealerId,
  query = {},
  options = {},
}: {
  dealerId: number
  query?: LeadQueryParams
  options?: ApiCallOptions
}): Promise<Paginated<SearchQuestionLead>> => {
  const defaultPagination = {
    page: 0,
    size: 10,
  }
  const { ...otherOptions } = options
  const { page, size, sort = {} } = query

  const { sortOrder, sortType } = sort

  const sortOrDefault = {
    sortType: sortType || ListingQuestionsSortParams.CREATED_DATE,
    sortOrder: sortOrder || SortOrderParams.DESC,
  }

  const queryParams = {
    page: pageOrDefault(page, defaultPagination),
    size: sizeOrDefault(size, defaultPagination),
    sort: `${toCamelCase(sortOrDefault.sortType)},${toCamelCase(
      sortOrDefault.sortOrder
    )}`,
  }

  const path = `dealers/${dealerId}/listings/questions?${toQueryString(
    queryParams
  )}`

  return fetchPath({
    path,
    options: {
      ...otherOptions,
      isAuthorizedRequest: true,
    },
  })
}

export const saveAnswerToQuestion = async ({
  dealerId,
  listingId,
  questionId,
  answer,
  options = {},
}: {
  dealerId: number
  listingId: number
  questionId: number
  answer: { answer: string }
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    const result = await putData({
      path: `dealers/${dealerId}/listings/${listingId}/questions/${questionId}/answer`,
      body: answer,
      options: { isAuthorizedRequest: true, ...options },
    })
    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const deleteQuestion = async ({
  dealerId,
  listingId,
  questionId,
  options = {},
}: {
  dealerId: number
  listingId: number
  questionId: number
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await deletePath({
      path: `dealers/${dealerId}/listings/${listingId}/questions/${questionId}`,
      options,
    })

    return {
      tag: "success",
      result: {},
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
