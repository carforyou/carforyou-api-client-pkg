import { postData, Service, handleValidationError } from "../../base"

import { WithValidationError } from "../../types/withValidationError"
import { LeasingInterest } from "../../types/models"

const wrappedFetchLeasingFormUrl = async (
  { listingId, locale },
  { recaptchaToken = null } = {}
): Promise<WithValidationError<{ url: string }>> => {
  try {
    const result = await postData({
      service: Service.CAR,
      path: `listings/${listingId}/leasing/generate-provider-form-url`,
      body: { language: locale },
      options: {
        headers: recaptchaToken ? { "Recaptcha-Token": recaptchaToken } : {},
      },
    })

    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const fetchLeasingFormUrl = async (
  args: {
    listingId: number
    locale: string
  },
  options = {}
): Promise<string | null> => {
  const response = await wrappedFetchLeasingFormUrl(args, options)

  switch (response.tag) {
    case "success":
      return response.result.url
    case "error":
      return null
  }
}

export const sendLeasingInterest = async (
  listingId: number,
  leasingInterest: LeasingInterest,
  options = {}
): Promise<WithValidationError<LeasingInterest>> => {
  const { validateOnly, recaptchaToken } = {
    validateOnly: false,
    recaptchaToken: null,
    ...options,
  }

  const path = `listings/${listingId}/leasing/interests${
    validateOnly ? "/validate" : ""
  }`

  try {
    await postData({
      service: Service.CAR,
      path,
      body: leasingInterest,
      options: {
        headers: recaptchaToken ? { "Recaptcha-Token": recaptchaToken } : {},
      },
    })

    return {
      tag: "success",
      result: leasingInterest,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
