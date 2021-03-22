import { WithValidationError } from "../../types/withValidationError"
import { ApiCallOptions, handleValidationError, postData } from "../../base"

export const postDealerFeedback = async ({
  dealerId,
  listingId,
  purchaseConfirmed,
  options = {},
}: {
  dealerId: number
  listingId: number
  purchaseConfirmed: boolean
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `dealers/${dealerId}/listings/${listingId}/car-sale/dealer-feedback`,
      body: { purchaseConfirmed },
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: {},
  }
}
