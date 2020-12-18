import { postData, ApiCallOptions, ignoreServerSideErrors } from "../../base"

import { WithValidationError } from "../../types/withValidationError"
import { BuyNowApplication } from "../../types/models/applications"

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
  const path = `/listings/${listingId}/buy-now-applications${
    validateOnly ? "/validate" : ""
  }`

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
