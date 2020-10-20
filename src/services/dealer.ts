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

import toQueryString from "../lib/toQueryString"

export const fetchDealer = async (
  id: number,
  options: { language?: "de" | "en" | "fr" | "it" } = {}
): Promise<Dealer> => {
  const query = toQueryString(options)
  return fetchPath({
    service: Service.DEALER,
    path: `dealers/${id}${query ? `?${query}` : ""}`,
  })
}

export const fetchDealerSuggestions = async (
  query: string
): Promise<Paginated<DealerSuggestion>> => {
  return fetchPath({
    service: Service.DEALER,
    path: `dealers/suggestions?q=${query ? encodeURIComponent(query) : query}`,
  })
}

export const fetchDealerProfile = async (
  dealerId: number,
  options: RequestOptions = {}
): Promise<DealerProfile> => {
  return fetchPath({
    service: Service.DEALER,
    path: `dealers/${dealerId}/profile`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}

export const postDealerProfile = async (
  profile: Omit<DealerProfile, "id" | "dealerSourceGroup" | "dealerType">,
  options: RequestOptions = {}
): Promise<WithValidationError<{ id: number }>> => {
  try {
    const result = await postData({
      service: Service.DEALER,
      path: `dealers/profile`,
      body: profile,
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })

    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const putDealerProfile = async (
  {
    dealerId,
    profile,
  }: {
    dealerId: number
    profile: DealerProfile
  },
  options: RequestOptions = {}
): Promise<WithValidationError<DealerProfile>> => {
  try {
    const result = await putData({
      service: Service.DEALER,
      path: `dealers/${dealerId}/profile`,
      body: profile,
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })

    return {
      tag: "success",
      result: { ...profile, ...result },
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const fetchDealerEntitlements = async (
  dealerId,
  options: RequestOptions = {}
): Promise<Entitlements> =>
  fetchPath({
    service: Service.DEALER,
    path: `dealers/${dealerId}/entitlements`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

export const fetchDealerPromotion = async (
  dealerId: number,
  options: RequestOptions = {}
): Promise<DealerPromotion> =>
  fetchPath({
    service: Service.DEALER,
    path: `dealers/${dealerId}/promotion`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

export const postDealerPromotion = async (
  dealerId: number,
  promotion: DealerPromotion,
  options: RequestOptions = {}
): Promise<WithValidationError<DealerPromotion>> => {
  try {
    const result = await postData({
      service: Service.DEALER,
      path: `dealers/${dealerId}/promotion`,
      body: promotion,
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })

    return {
      tag: "success",
      result: { ...promotion, ...result },
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const putDealerPromotion = async (
  dealerId: number,
  promotion: DealerPromotion,
  options: RequestOptions = {}
): Promise<WithValidationError<DealerPromotion>> => {
  try {
    const result = await putData({
      service: Service.DEALER,
      path: `dealers/${dealerId}/promotion`,
      body: promotion,
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })

    return {
      tag: "success",
      result: { ...promotion, ...result },
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
