import { fetchPath, Service, handleValidationError, putData } from "../base"

import { Paginated } from "../types/pagination"
import { Dealer, DealerSuggestion, Entitlements } from "../types/models"
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

export const fetchDealerEntitlements = async (
  dealerId
): Promise<Entitlements> =>
  fetchPath(Service.DEALER, `dealers/${dealerId}/entitlements`)
