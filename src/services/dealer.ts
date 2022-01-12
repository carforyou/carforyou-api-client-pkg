import { WithValidationError } from "../types/withValidationError"
import { Language } from "../types/params"
import { Paginated } from "../types/pagination"
import { DealerPromotion } from "../types/models/dealerPromotion"
import { DealerProfile } from "../types/models/dealerProfile"
import { UserAccount } from "../types/models/account"
import { Dealer, DealerSuggestion, Entitlements } from "../types/models"
import toQueryString from "../lib/toQueryString"
import {
  ApiCallOptions,
  deletePath,
  fetchPath,
  handleValidationError,
  postData,
  putData,
} from "../base"
import { DealerPreferences } from ".."

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
  association,
  page,
  size,
  options = {},
}: {
  query?: string
  association?: string
  page?: number
  size?: number
  options?: ApiCallOptions
}): Promise<Paginated<DealerSuggestion>> => {
  return fetchPath({
    path: `dealers/suggestions?${toQueryString({
      association,
      page,
      size,
      q: query,
    })}`,
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

export const setLogo = async ({
  dealerId,
  logo,
  options = {},
}: {
  dealerId: number
  logo: string
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    const result = await putData({
      path: `dealers/${dealerId}/logo`,
      body: { logo },
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

export const setImage = async ({
  dealerId,
  image,
  options = {},
}: {
  dealerId: number
  image: string
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    const result = await putData({
      path: `dealers/${dealerId}/image`,
      body: { image },
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

export const putDealerDescription = async ({
  dealerId,
  description,
  options = {},
}: {
  dealerId: number
  description: string
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    const result = await putData({
      path: `dealers/${dealerId}/description`,
      body: { description },
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

export const putUserAccount = async ({
  userAccount,
  options = {},
}: {
  userAccount: UserAccount
  options?: ApiCallOptions
}): Promise<WithValidationError<UserAccount>> => {
  try {
    const result = await putData({
      path: `users/me/account`,
      body: userAccount,
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

export const deleteUser = async ({
  options = {},
}: {
  options?: ApiCallOptions
}): Promise<Response> => {
  return deletePath({
    path: `users/me`,
    options: { isAuthorizedRequest: true, ...options },
  })
}

export const fetchDealerPreferences = async ({
  dealerId,
  options = {},
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<DealerPreferences> => {
  return fetchPath({
    path: `dealers/${dealerId}/preferences`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}

export const putDealerPreferences = async ({
  dealerId,
  preferences,
  options = {},
}: {
  dealerId: number
  preferences: DealerPreferences
  options?: ApiCallOptions
}): Promise<void> => {
  return putData({
    path: `dealers/${dealerId}/preferences`,
    body: preferences,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}
