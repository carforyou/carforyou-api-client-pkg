import { WithValidationError } from "../../types/withValidationError"
import { BuyNowApplication } from "../../types/models/applications"
import { createApiPathWithValidate } from "../../lib/path"
import { ApiCallOptions, ignoreServerSideErrors, postData } from "../../base"

export const sendBuyNowApplication = async ({
  listingId,
  buyNowApplication,
  options = {},
}: {
  listingId: number
  buyNowApplication: BuyNowApplication
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<WithValidationError<BuyNowApplication>> => {
  const { validateOnly = false, ...otherOptions } = options

  const path = createApiPathWithValidate(
    `/listings/${listingId}/buy-now-applications`,
    validateOnly
  )

  try {
    await postData({
      path,
      body: buyNowApplication,
      options: otherOptions,
    })
    return {
      tag: "success",
      result: buyNowApplication,
    }
  } catch (error) {
    return ignoreServerSideErrors({ error, returnValue: buyNowApplication })
  }
}
