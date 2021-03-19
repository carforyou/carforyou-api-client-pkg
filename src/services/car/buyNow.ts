import { WithValidationError } from "../../types/withValidationError"
import { BuyNowApplication } from "../../types/models/applications"
import { BuyNowConfiguration } from "../../types/models"
import { createApiPathWithValidate } from "../../lib/path"
import {
  ApiCallOptions,
  fetchPath,
  handleValidationError,
  postData,
} from "../../base"

export const sendBuyNowApplication = async ({
  listingId,
  buyNowApplication,
  options = {},
}: {
  listingId: number
  buyNowApplication: BuyNowApplication
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<
  WithValidationError<{
    paymentUrl: string
  }>
> => {
  const { validateOnly = false, ...otherOptions } = options

  const path = createApiPathWithValidate(
    `/listings/${listingId}/buy-now-applications`,
    validateOnly
  )

  try {
    const response = await postData({
      path,
      body: buyNowApplication,
      options: otherOptions,
    })
    return {
      tag: "success",
      result: response,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const markBuyNowApplicationAsPaid = async ({
  buyNowApplicationKey,
  options = {},
}: {
  buyNowApplicationKey: string
  options?: ApiCallOptions
}): Promise<Response> => {
  return postData({
    path: `listings/buy-now-applications/key/${buyNowApplicationKey}/mark-as-paid`,
    body: {},
    options,
  })
}

export const fetchBuyNowConfiguration = async ({
  dealerId,
  options = {},
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<BuyNowConfiguration> => {
  return fetchPath({
    path: `dealers/${dealerId}/buy-now-configuration`,
    options,
  })
}
