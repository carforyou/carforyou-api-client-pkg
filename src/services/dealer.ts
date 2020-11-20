import {
  fetchPath,
  handleValidationError,
  putData,
  postData,
  ApiCallOptions,
} from "../base"

import { Language } from "../types/params"
import { Paginated } from "../types/pagination"
import { Dealer, DealerSuggestion, Entitlements } from "../types/models"
import { DealerProfile } from "../types/models/dealerProfile"
import { DealerPromotion } from "../types/models/dealerPromotion"
import { WithValidationError } from "../types/withValidationError"

import toQueryString from "../lib/toQueryString"

export const fetchDealer = async ({
  id,
  language,
  options = {},
}: {
  id: number
  language?: Language
  options?: ApiCallOptions
}): Promise<Dealer> => {
  const query = toQueryString({ language })
  return fetchPath({
    path: `dealers/${id}${query ? `?${query}` : ""}`,
    options,
  })
}

export const fetchDealerSuggestions = async ({
  query,
  options = {},
}: {
  query: string
  options?: ApiCallOptions
}): Promise<Paginated<DealerSuggestion>> => {
  return fetchPath({
    path: `dealers/suggestions?q=${query ? encodeURIComponent(query) : query}`,
    options,
  })
}

export const fetchDealerProfile = async ({
  dealerId,
  options = {},
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<DealerProfile> =>
  fetchPath({
    path: `dealers/${dealerId}/profile`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

export const postDealerProfile = async ({
  profile,
  options = {},
}: {
  profile: Omit<DealerProfile, "id" | "dealerSourceGroup" | "dealerType">
  options?: ApiCallOptions
}): Promise<WithValidationError<{ id: number }>> => {
  try {
    const result = await postData({
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

export const putDealerProfile = async ({
  dealerId,
  profile,
  options = {},
}: {
  dealerId: number
  profile: DealerProfile
  options?: ApiCallOptions
}): Promise<WithValidationError<DealerProfile>> => {
  try {
    const result = await putData({
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

export const fetchDealerEntitlements = async ({
  dealerId,
  options = {},
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<Entitlements> =>
  fetchPath({
    path: `dealers/${dealerId}/entitlements`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

export const fetchDealerPromotion = async ({
  dealerId,
  options = {},
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<DealerPromotion> =>
  fetchPath({
    path: `dealers/${dealerId}/promotion`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

export const postDealerPromotion = async ({
  dealerId,
  promotion,
  options = {},
}: {
  dealerId: number
  promotion: DealerPromotion
  options?: ApiCallOptions
}): Promise<WithValidationError<DealerPromotion>> => {
  try {
    const result = await postData({
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

export const putDealerPromotion = async ({
  dealerId,
  promotion,
  options = {},
}: {
  dealerId: number
  promotion: DealerPromotion
  options?: ApiCallOptions
}): Promise<WithValidationError<DealerPromotion>> => {
  try {
    const result = await putData({
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

export const requestMatelsoIntegration = async ({
  dealerId,
  options = {},
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    const result = await postData({
      path: `dealers/${dealerId}/request-matelso-integration`,
      body: {},
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

export const requestWhatsappIntegration = async ({
  dealerId,
  whatsAppNumber,
  options = {},
}: {
  dealerId: number
  whatsAppNumber: string
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    const result = await postData({
      path: `dealers/${dealerId}/request-matelso-integration`,
      body: { whatsAppNumber },
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
