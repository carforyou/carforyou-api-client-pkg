import { fetchTypes } from "./search/typeSearch"

import { Paginated } from "../types/pagination"
import { SearchType } from "../types/models/type"
import { WithValidationError } from "../index"
import { ApiCallOptions, fetchPath, handleValidationError } from "../base"

export const fetchFrameNumberTypes = async ({
  query,
  options = {},
}: {
  query: { dealerId: number; frameNumber: string; page?: number; size?: number }
  options?: ApiCallOptions
}): Promise<WithValidationError<Paginated<SearchType>>> => {
  try {
    const { dealerId, frameNumber, page, size } = query
    const { types: typeIds } = await fetchPath({
      path: `dealers/${dealerId}/vehicles/frame-number/${frameNumber}`,
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })

    return fetchTypes({ query: { id: typeIds, page, size }, options })
  } catch (error) {
    return handleValidationError(error)
  }
}
