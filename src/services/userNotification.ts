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
  savedSearch: SavedSearch
  options?: ApiCallOptions
}): Promise<WithValidationError<SavedSearch>> => {
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
