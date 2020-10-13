import {
  fetchPath,
  Service,
  handleValidationError,
  putData,
  postData,
  RequestOptions,
} from "../base"

import { Paginated } from "../types/pagination"
import { Dealer, DealerSuggestion, Entitlements } from "../types/models"
import { DealerProfile } from "../types/models/dealerProfile"
import { DealerPromotion } from "../types/models/dealerPromotion"
import { WithValidationError } from "../types/withValidationError"
import { withTokenRefresh } from "../tokenRefresh"

import toQueryString from "../lib/toQueryString"

export const fetchDealer = async (
  id: number,
  options: { language?: "de" | "en" | "fr" | "it" } = {}
): Promise<Dealer> => {
  const query = toQueryString(options)
  return fetchPath(Service.DEALER, `dealers/${id}${query ? `?${query}` : ""}`)
}

export const fetchDealerSuggestions = async (
  query: string
): Promise<Paginated<DealerSuggestion>> => {
  return fetchPath(
    Service.DEALER,
    `dealers/suggestions?q=${query ? encodeURIComponent(query) : query}`
  )
}

// TODO:

export const fetchDealerProfile = async (
  dealerId: number,
  options: RequestOptions
): Promise<DealerProfile> => {
  return fetchPath(Service.DEALER, `dealers/${dealerId}/profile`, {
    isAuthorizedRequest: true,
    ...options,
  })
}

export const postDealerProfile = async (
  profile: Omit<DealerProfile, "id" | "dealerSourceGroup" | "dealerType">
): Promise<WithValidationError<{ id: number }>> => {
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

export const fetchDealerEntitlements = async (
  dealerId,
  options?: RequestOptions
): Promise<Entitlements> =>
  fetchPath(Service.DEALER, `dealers/${dealerId}/entitlements`, {
    isAuthorizedRequest: true,
    ...options,
  })

export const fetchDealerPromotion = async (
  dealerId: number
): Promise<DealerPromotion> =>
  withTokenRefresh(async () =>
    fetchPath(Service.DEALER, `dealers/${dealerId}/promotion`)
  )

export const postDealerPromotion = async (
  dealerId: number,
  promotion: DealerPromotion
): Promise<WithValidationError<DealerPromotion>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await postData(
        Service.DEALER,
        `dealers/${dealerId}/promotion`,
        promotion
      )

      return {
        tag: "success",
        result: { ...promotion, ...result },
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}

export const putDealerPromotion = async (
  dealerId: number,
  promotion: DealerPromotion
): Promise<WithValidationError<DealerPromotion>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await putData(
        Service.DEALER,
        `dealers/${dealerId}/promotion`,
        promotion
      )

      return {
        tag: "success",
        result: { ...promotion, ...result },
      }
    } catch (error) {
      return handleValidationError(error, { swallowErrors: true })
    }
  })
}
