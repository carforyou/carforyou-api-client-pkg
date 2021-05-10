import { WithValidationError } from "../../types/withValidationError"
import { ApiCallOptions, handleValidationError, postData } from "../../base"

export const postBulkDealerFeedback = async ({
  dealerId,
  elements,
  options = {},
}: {
  dealerId: number
  elements: {
    listingId: number
    purchaseConfirmed: boolean
  }[]
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `dealers/${dealerId}/listings/car-sale/dealer-feedback`,
      body: {
        elements,
      },
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
