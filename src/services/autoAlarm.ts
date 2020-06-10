import {
  fetchPath,
  Service,
  handleValidationError,
  putData,
  deletePath,
  postData,
} from "../base"

import { Paginated } from "../types/pagination"
import { DealerSavedSearch, AutoAlarmType } from "../types/models/autoAlarm"
import { WithValidationError } from "../types/withValidationError"
import { withTokenRefresh } from "../tokenRefresh"

export const fetchSavedSearches = async (
  id: number,
  type: AutoAlarmType,
  page?: number,
  size?: number
): Promise<Paginated<DealerSavedSearch>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await fetchPath(
        Service.DEALER,
        `dealers/${id}/listing-saved-searches?type=${type}${page ? `&page=${page}` : ""}${size ? `&page=${size}` : ""}`
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
  savedSearchId: number
): Promise<DealerSavedSearch> => {
  return withTokenRefresh(async () => {
    try {
      const result = await fetchPath(
        Service.DEALER,
        `dealers/${dealerId}/listing-saved-searches/${savedSearchId}`
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
  savedSearchId: number
  savedSearch: object
}): Promise<WithValidationError<DealerSavedSearch>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await putData(
        Service.DEALER,
        `dealers/${dealerId}/listing-saved-searches/${savedSearchId}`,
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
  savedSearch: object
}): Promise<WithValidationError<DealerSavedSearch>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await postData(
        Service.DEALER,
        `dealers/${dealerId}/listing-saved-searches`,
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
  savedSearchId: number
): Promise<WithValidationError<{}>> => {
  return withTokenRefresh(async () => {
    try {
      const result = deletePath(
        Service.DEALER,
        `dealers/${dealerId}/listing-saved-searches/${savedSearchId}`
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
