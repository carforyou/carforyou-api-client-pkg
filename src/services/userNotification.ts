import {
  postData,
  deletePath,
  handleValidationError,
  ApiCallOptions,
} from "../base"

import { SavedSearch } from "../types/models"
import { WithValidationError } from "../types/withValidationError"
import paramsToSearchRequest from "../lib/paramsToSearchRequest"

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
