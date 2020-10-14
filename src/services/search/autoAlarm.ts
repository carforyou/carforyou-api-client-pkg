import {
  fetchPath,
  Service,
  handleValidationError,
  putData,
  deletePath,
  postData,
  RequestOptions,
} from "../../base"
import toQueryString from "../../lib/toQueryString"

import { Paginated } from "../../types/pagination"
import { DealerSavedSearch } from "../../types/models/autoAlarm"
import { WithValidationError } from "../../types/withValidationError"

export const fetchSavedSearches = async (
  dealerId: number,
  page?: number,
  size?: number,
  options: RequestOptions = {}
): Promise<WithValidationError<Paginated<DealerSavedSearch>>> => {
  const query = toQueryString({ page, size })
  try {
    const result = await fetchPath({
      service: Service.SEARCH,
      path: `dealers/${dealerId}/listing-saved-searches/auto-alarms${
        query ? `?${query}` : ""
      }`,
      options: { isAuthorizedRequest: true, ...options },
    })

    return {
      tag: "success",
      ...result,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const fetchSavedSearch = async (
  dealerId: number,
  savedSearchId: string,
  options: RequestOptions = {}
): Promise<WithValidationError<DealerSavedSearch>> => {
  try {
    const result = await fetchPath({
      service: Service.SEARCH,
      path: `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`,
      options: { isAuthorizedRequest: true, ...options },
    })

    return {
      tag: "success",
      ...result,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const putDealerSavedSearch = async (
  {
    dealerId,
    savedSearchId,
    savedSearch,
  }: {
    dealerId: number
    savedSearchId: string
    savedSearch: DealerSavedSearch
  },
  options: RequestOptions = {}
): Promise<WithValidationError<DealerSavedSearch>> => {
  try {
    const result = await putData({
      service: Service.SEARCH,
      path: `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`,
      body: savedSearch,
      options: { isAuthorizedRequest: true, ...options },
    })

    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const postDealerSavedSearch = async (
  {
    dealerId,
    savedSearch,
  }: {
    dealerId: number
    savedSearch: DealerSavedSearch
  },
  options: RequestOptions = {}
): Promise<WithValidationError<DealerSavedSearch>> => {
  try {
    const result = await postData({
      service: Service.SEARCH,
      path: `dealers/${dealerId}/listing-saved-searches/auto-alarms`,
      body: savedSearch,
      options: { isAuthorizedRequest: true, ...options },
    })

    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const deleteDealerSavedSearch = async (
  dealerId: number,
  savedSearchId: string,
  options: RequestOptions = {}
): Promise<WithValidationError<unknown>> => {
  try {
    const result = deletePath({
      service: Service.SEARCH,
      path: `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`,
      options: { isAuthorizedRequest: true, ...options },
    })

    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
