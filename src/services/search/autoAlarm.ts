import { WithValidationError } from "../../types/withValidationError"
import { Paginated } from "../../types/pagination"
import { DealerSavedSearch } from "../../types/models/autoAlarm"
import toQueryString from "../../lib/toQueryString"
import {
  ApiCallOptions,
  deletePath,
  fetchPath,
  handleValidationError,
  postData,
  putData,
} from "../../base"

export const fetchDealerSavedSearches = async ({
  dealerId,
  page,
  size,
  options = {},
}: {
  dealerId: number
  page?: number
  size?: number
  options?: ApiCallOptions
}): Promise<Paginated<DealerSavedSearch>> => {
  const query = toQueryString({ page, size })
  return fetchPath({
    path: `dealers/${dealerId}/listing-saved-searches/auto-alarms${
      query ? `?${query}` : ""
    }`,
    options: { isAuthorizedRequest: true, ...options },
  })
}

export const fetchDealerSavedSearch = async ({
  dealerId,
  savedSearchId,
  options = {},
}: {
  dealerId: number
  savedSearchId: string
  options?: ApiCallOptions
}): Promise<DealerSavedSearch> => {
  return fetchPath({
    path: `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`,
    options: { isAuthorizedRequest: true, ...options },
  })
}

export const putDealerSavedSearch = async ({
  dealerId,
  savedSearchId,
  savedSearch,
  options = {},
}: {
  dealerId: number
  savedSearchId: string
  savedSearch: DealerSavedSearch
  options?: ApiCallOptions
}): Promise<WithValidationError<DealerSavedSearch>> => {
  try {
    await putData({
      path: `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`,
      body: savedSearch,
      options: { isAuthorizedRequest: true, ...options },
    })

    return {
      tag: "success",
      result: savedSearch,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const postDealerSavedSearch = async ({
  dealerId,
  savedSearch,
  options = {},
}: {
  dealerId: number
  savedSearch: DealerSavedSearch
  options?: ApiCallOptions
}): Promise<WithValidationError<DealerSavedSearch>> => {
  try {
    await postData({
      path: `dealers/${dealerId}/listing-saved-searches/auto-alarms`,
      body: savedSearch,
      options: { isAuthorizedRequest: true, ...options },
    })

    return {
      tag: "success",
      result: savedSearch,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const deleteDealerSavedSearch = async ({
  dealerId,
  savedSearchId,
  options = {},
}: {
  dealerId: number
  savedSearchId: string
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await deletePath({
      path: `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`,
      options: { isAuthorizedRequest: true, ...options },
    })

    return {
      tag: "success",
      result: {},
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
