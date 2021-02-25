import { Paginated, SearchType, WithValidationError } from "../index"
import { ApiCallOptions, fetchPath, handleValidationError } from "../base"

export const fetchFrameNumberTypes = async ({
  query,
  options = {},
}: {
  query: { dealerId: number; frameNumber: string }
  options?: ApiCallOptions
}): Promise<WithValidationError<Paginated<SearchType>>> => {
  try {
    const { dealerId, frameNumber } = query
    const result = await fetchPath({
      path: `dealers/${dealerId}/vehicles/frame-number/${frameNumber}`,
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
    return {
      tag: "success",
      result: { content: result.types, pagination: null },
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
