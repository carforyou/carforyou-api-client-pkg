import { postData, deletePath, Service, handleValidationError } from "../base"

import { SavedSearch } from "../types/models"
import { WithValidationError } from "../types/withValidationError"

export const sendSavedSearch = async (
  data: SavedSearch,
  options = {}
): Promise<WithValidationError<SavedSearch>> => {
  const { recaptchaToken } = {
    recaptchaToken: null,
    ...options
  }

  try {
    await postData(
      Service.USER_NOTIFICATION,
      "saved-searches",
      data,
      recaptchaToken ? { "Recaptcha-Token": recaptchaToken } : {}
    )

    return {
      tag: "success",
      result: data
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const deleteSavedSearch = async (
  key: string
): Promise<WithValidationError<{}>> => {
  try {
    await deletePath(Service.USER_NOTIFICATION, `saved-searches/key/${key}`)
    return {
      tag: "success",
      result: {}
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
