import {
  fetchPath,
  Service,
  handleValidationError,
  putData,
  postData,
} from "../base"

import { Paginated } from "../types/pagination"
import { Dealer, DealerSuggestion } from "../types/models"
import { DealerProfile } from "../types/models/dealerProfile"
import { WithValidationError } from "../types/withValidationError"
import { withTokenRefresh } from "../tokenRefresh"

export const fetchDealer = async (id: number): Promise<Dealer> => {
  return fetchPath(Service.DEALER, `dealers/${id}`)
}

export const fetchDealerSuggestions = async (
  query: string
): Promise<Paginated<DealerSuggestion>> => {
  return fetchPath(
    Service.DEALER,
    `dealers/suggestions?q=${query ? encodeURIComponent(query) : query}`
  )
}

export const fetchDealerProfile = async (
  dealerId: number
): Promise<DealerProfile> => {
  return fetchPath(Service.DEALER, `dealers/${dealerId}/profile`)
}

export const postDealerProfile = async ({
  profile,
}: {
  profile: Omit<DealerProfile, "id" | "dealerSource">
}): Promise<WithValidationError<{ id: number }>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await postData(Service.DEALER, `dealers/profile`, profile)

      return {
        tag: "success",
        result,
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}

export const putDealerProfile = async ({
  dealerId,
  profile,
}: {
  dealerId: number
  profile: DealerProfile
}): Promise<WithValidationError<DealerProfile>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await putData(
        Service.DEALER,
        `dealers/${dealerId}/profile`,
        profile
      )

      return {
        tag: "success",
        result: { ...profile, ...result },
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}
