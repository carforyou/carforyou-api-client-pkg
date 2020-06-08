import { fetchPath, Service, handleValidationError, putData, deletePath, postData } from "../base"

import { Paginated } from "../types/pagination"
import { Dealer, DealerSuggestion } from "../types/models"
import { DealerProfile } from "../types/models/dealerProfile"
import { WithValidationError } from "../types/withValidationError"
import { withTokenRefresh } from "../tokenRefresh"

export const fetchSavedSearches = async (id: number): Promise<Dealer> => {
  return fetchPath(Service.DEALER, `dealers/${id}/listing-saved-searches`)
}

export const fetchSavedSearch = async (
  dealerId: number,
  savedSearchId: number
): Promise<Paginated<DealerSuggestion>> => {
  return fetchPath(
    Service.DEALER,
    `dealers/${dealerId}/listing-saved-searches/${savedSearchId}`
  )
}

export const putDealerSavedSearch = async ({
    dealerId,
    savedSearchId,
    savedSearch
}: {
    dealerId: number,
    savedSearchId: number,
    savedSearch: object
}): Promise<WithValidationError<DealerProfile>> => {
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
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}

export const postDealerSavedSearch = async ({
    dealerId,
    savedSearch
}: {
    dealerId: number,
    savedSearch: object
}): Promise<WithValidationError<DealerProfile>> => {
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
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}

export const deleteDealerSavedSearch = async (
    dealerId: number,
    savedSearchId: number
  ): Promise<Paginated<DealerSuggestion>> => {
    return withTokenRefresh(async () => {
      try {
        const result = deletePath(
          Service.DEALER,
          `dealers/${dealerId}/listing-saved-searches/${savedSearchId}`
        )

        return {
          tag: "success",
          result: { savedSearchId, result }
        }
      } catch (error) {
        return handleValidationError(error, { swallowErrors: true })
      }
    })
  }

