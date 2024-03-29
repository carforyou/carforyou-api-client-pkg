import { WithValidationError } from "../types/withValidationError"
import { SavedSearch } from "../types/models"
import paramsToSearchRequest from "../lib/paramsToSearchRequest"
import {
  ApiCallOptions,
  deletePath,
  fetchPath,
  handleValidationError,
  postData,
} from "../base"

export const sendSavedSearch = async ({
  savedSearch,
  options = {},
}: {
  savedSearch: Omit<SavedSearch, "enabledUntil">
  options?: ApiCallOptions
}): Promise<WithValidationError<Omit<SavedSearch, "enabledUntil">>> => {
  const { searchQuery, ...rest } = savedSearch

  try {
    await postData({
      path: "saved-searches",
      body: { ...rest, searchQuery: paramsToSearchRequest(searchQuery) },
      options,
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
  options?: ApiCallOptions
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

export const enableSavedSearch = async ({
  key,
  options = {},
}: {
  key: string
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `saved-searches/key/${key}/enable`,
      body: {},
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

export const extendSavedSearch = async ({
  key,
  options = {},
}: {
  key: string
  options?: ApiCallOptions
}): Promise<Response> => {
  return postData({
    path: `saved-searches/key/${key}/extend`,
    body: {},
    options,
  })
}

export const fetchSavedSearch = async ({
  key,
  options = {},
}: {
  key: string
  options?: ApiCallOptions
}): Promise<SavedSearch> =>
  fetchPath({
    path: `saved-searches/key/${key}`,
    options,
  })

export const sendSavedSearchFeedback = async ({
  reason,
  key,
  options = {},
}: {
  reason: string
  key: string
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `saved-searches/key/${key}/unsubscribe-feedback`,
      body: { reason },
      options,
    })

    return {
      tag: "success",
      result: {},
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
