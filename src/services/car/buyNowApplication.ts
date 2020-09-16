import { postData, handleValidationError, Service } from "../../base"

import { WithValidationError } from "../../types/withValidationError"
import { BuyNowApplication } from "../../types/models/applications"

export const sendBuyNowApplication = async (
  listingId: number,
  buyNowApplication: BuyNowApplication,
  { recaptchaToken = null, validateOnly = false } = {}
): Promise<WithValidationError<BuyNowApplication>> => {
  const path = `/listings/${listingId}/buy-now-applications${
    validateOnly ? "/validate" : ""
  }`

  const headers = {
    ...(recaptchaToken ? { "Recaptcha-Token": recaptchaToken } : {}),
  }

  try {
    await postData(Service.CAR, path, buyNowApplication, headers)
    return {
      tag: "success",
      result: buyNowApplication,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
