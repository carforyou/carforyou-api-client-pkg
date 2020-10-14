import {
  fetchPath,
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
import { withTokenRefresh } from "../../tokenRefresh"

export const fetchSavedSearches = async ({
  dealerId,
  page,
  size,
  options = {},
}: {
  dealerId: number
  page?: number
  size?: number
  options?: RequestOptions
}): Promise<Paginated<DealerSavedSearch>> => {
  return withTokenRefresh(async () => {
    const query = toQueryString({ page, size })
    try {
      const result = await fetchPath({
        path: `dealers/${dealerId}/listing-saved-searches/auto-alarms${
          query ? `?${query}` : ""
        }`,
        options,
      })

      return {
        tag: "success",
        ...result,
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}

export const fetchSavedSearch = async ({
  dealerId,
  savedSearchId,
  options = {},
}: {
  dealerId: number
  savedSearchId: string
  options?: RequestOptions
}): Promise<DealerSavedSearch> => {
  return withTokenRefresh(async () => {
    try {
      const result = await fetchPath({
        path: `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`,
        options,
      })

      return {
        tag: "success",
        ...result,
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
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
  options?: RequestOptions
}): Promise<WithValidationError<DealerSavedSearch>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await putData({
        path: `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`,
        body: savedSearch,
        options,
      })

      return {
        tag: "success",
        result,
        savedSearch,
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}

export const postDealerSavedSearch = async ({
  dealerId,
  savedSearch,
  options = {},
}: {
  dealerId: number
  savedSearch: DealerSavedSearch
  options?: RequestOptions
}): Promise<WithValidationError<DealerSavedSearch>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await postData({
        path: `dealers/${dealerId}/listing-saved-searches/auto-alarms`,
        body: savedSearch,
        options,
      })

      return {
        tag: "success",
        result,
        savedSearch,
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}

export const deleteDealerSavedSearch = async ({
  dealerId,
  savedSearchId,
  options = {},
}: {
  dealerId: number
  savedSearchId: string
  options?: RequestOptions
}): Promise<WithValidationError> => {
  return withTokenRefresh(async () => {
    try {
      const result = deletePath({
        path: `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`,
        options,
      })

      return {
        tag: "success",
        result,
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}
