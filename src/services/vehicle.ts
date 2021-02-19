import { SearchType, WithValidationError } from "../index"
import { ApiCallOptions, handleValidationError, postData } from "../base"

export const fetchFrameNumberTypes = async ({
  query,
  options = {},
}: {
  query: { dealerId: number; frameNumber: string }
  options?: ApiCallOptions
}): Promise<WithValidationError<SearchType>> => {
  try {
    const { dealerId, frameNumber } = query
    const result = await postData({
      path: `dealers/${dealerId}/vehicles/frame-number/${frameNumber}`,
      body: {
        query,
      },
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
    return handleValidationError(error)
  }
}
