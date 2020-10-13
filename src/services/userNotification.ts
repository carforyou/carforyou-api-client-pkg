import { postData, deletePath, Service, handleValidationError } from "../base"

import { SavedSearch } from "../types/models"
import { WithValidationError } from "../types/withValidationError"
import paramsToSearchRequest from "../lib/paramsToSearchRequest"

export const sendSavedSearch = async (
  data: SavedSearch,
  options = {}
): Promise<WithValidationError<SavedSearch>> => {
  const { recaptchaToken } = {
    recaptchaToken: null,
    ...options,
  }
  const { searchQuery, ...rest } = data

  try {
    await postData({
      service: Service.USER_NOTIFICATION,
      path: "saved-searches",
      body: { ...rest, searchQuery: paramsToSearchRequest(searchQuery) },
      options: {
        headers: recaptchaToken ? { "Recaptcha-Token": recaptchaToken } : {},
      },
    })

    return {
      tag: "success",
      result: data,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const deleteSavedSearch = async (
  key: string
): Promise<WithValidationError> => {
  try {
    await deletePath({
      service: Service.USER_NOTIFICATION,
      path: `saved-searches/key/${key}`,
    })
    return {
      tag: "success",
      result: {},
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
