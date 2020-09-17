import {
  fetchPath,
  Service,
  handleValidationError,
  putData,
  deletePath,
  postData,
} from "../../base"
import toQueryString from "../../lib/toQueryString"

import { Paginated } from "../../types/pagination"
import { DealerSavedSearch } from "../../types/models/autoAlarm"
import { WithValidationError } from "../../types/withValidationError"
import { withTokenRefresh } from "../../tokenRefresh"

export const fetchSavedSearches = async (
  dealerId: number,
  page?: number,
  size?: number
): Promise<Paginated<DealerSavedSearch>> => {
  return withTokenRefresh(async () => {
    const query = toQueryString({ page, size })
    try {
      const result = await fetchPath(
        Service.SEARCH,
        `dealers/${dealerId}/listing-saved-searches/auto-alarms${
          query ? `?${query}` : ""
        }`
      )

      return {
        tag: "success",
        ...result,
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}

export const fetchSavedSearch = async (
  dealerId: number,
  savedSearchId: string
): Promise<DealerSavedSearch> => {
  return withTokenRefresh(async () => {
    try {
      const result = await fetchPath(
        Service.SEARCH,
        `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`
      )

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
}: {
  dealerId: number
  savedSearchId: string
  savedSearch: DealerSavedSearch
}): Promise<WithValidationError<DealerSavedSearch>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await putData(
        Service.SEARCH,
        `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`,
        savedSearch
      )

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
}: {
  dealerId: number
  savedSearch: DealerSavedSearch
}): Promise<WithValidationError<DealerSavedSearch>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await postData(
        Service.SEARCH,
        `dealers/${dealerId}/listing-saved-searches/auto-alarms`,
        savedSearch
      )

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

export const deleteDealerSavedSearch = async (
  dealerId: number,
  savedSearchId: string
): Promise<WithValidationError> => {
  return withTokenRefresh(async () => {
    try {
      const result = deletePath(
        Service.SEARCH,
        `dealers/${dealerId}/listing-saved-searches/auto-alarms/${savedSearchId}`
      )

      return {
        tag: "success",
        result,
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}
