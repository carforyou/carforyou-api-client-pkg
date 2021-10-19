import { WithValidationError } from "../../types/withValidationError"
import { BuyerProtectionApplication } from "../../types/models/buyerProtection"
import { ApiCallOptions, handleValidationError, postData } from "../../base"

export const sendBuyerProtectionApplication = async ({
  listingId,
  buyerProtectionApplication,
  options = {},
}: {
  listingId: number
  buyerProtectionApplication: BuyerProtectionApplication
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<WithValidationError<BuyerProtectionApplication>> => {
  try {
    const response = await postData({
      path: `listings/${listingId}/buyer-protection-applications`,
      body: buyerProtectionApplication,
      options,
    })
    return {
      tag: "success",
      result: response,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
