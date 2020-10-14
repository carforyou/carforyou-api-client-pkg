import {
  postData,
  deletePath,
  handleValidationError,
  RequestOptions,
} from "../base"

import { SavedSearch } from "../types/models"
import { WithValidationError } from "../types/withValidationError"
import paramsToSearchRequest from "../lib/paramsToSearchRequest"

export const sendSavedSearch = async ({
  savedSearch,
  recaptchaToken,
  options = {},
}: {
  savedSearch: SavedSearch
  recaptchaToken?: string
  options?: RequestOptions
}): Promise<WithValidationError<SavedSearch>> => {
  const { headers = {}, ...otherOptions } = options
  const { searchQuery, ...rest } = savedSearch

  try {
    await postData({
      path: "saved-searches",
      body: { ...rest, searchQuery: paramsToSearchRequest(searchQuery) },
      options: {
        ...otherOptions,
        headers: {
          ...headers,
          ...(recaptchaToken ? { "Recaptcha-Token": recaptchaToken } : {}),
        },
      },
    })

    return {
      tag: "success",
      result: savedSearch,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const deleteSavedSearch = async ({
  key,
  options = {},
}: {
  key: string
  options?: RequestOptions
}): Promise<WithValidationError> => {
  try {
    await deletePath({
      path: `saved-searches/key/${key}`,
      options,
    })

    return {
      tag: "success",
      result: {},
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
