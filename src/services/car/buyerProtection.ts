import { WithValidationError } from "../../types/withValidationError"
import { BuyerProtectionApplication } from "../../types/models/buyerProtection"
import { createApiPathWithValidate } from "../../lib/path"
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
  const { validateOnly = false } = options

  const path = createApiPathWithValidate(
    `/listings/${listingId}/buyer-protection-applications`,
    validateOnly
  )

  try {
    const response = await postData({
      path: path,
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
