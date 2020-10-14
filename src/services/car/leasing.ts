import {
  postData,
  handleValidationError,
  RequestOptionsWithRecaptcha,
} from "../../base"

import { WithValidationError } from "../../types/withValidationError"
import { LeasingInterest } from "../../types/models"

const wrappedFetchLeasingFormUrl = async ({
  listingId,
  locale,
  options = {},
}: {
  listingId: number
  locale: string
  options?: RequestOptionsWithRecaptcha
}): Promise<WithValidationError<{ url: string }>> => {
  try {
    const result = await postData({
      path: `listings/${listingId}/leasing/generate-provider-form-url`,
      body: { language: locale },
      options,
    })

    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}

export const fetchLeasingFormUrl = async (args: {
  listingId: number
  locale: string
  options?: RequestOptionsWithRecaptcha
}): Promise<string | null> => {
  const response = await wrappedFetchLeasingFormUrl(args)

  switch (response.tag) {
    case "success":
      return response.result.url
    case "error":
      return null
  }
}

export const sendLeasingInterest = async ({
  listingId,
  leasingInterest,
  options = {},
}: {
  listingId: number
  leasingInterest: LeasingInterest
  options?: RequestOptionsWithRecaptcha & { validateOnly?: boolean }
}): Promise<WithValidationError<LeasingInterest>> => {
  const { validateOnly, ...otherOptions } = options

  const path = `listings/${listingId}/leasing/interests${
    validateOnly ? "/validate" : ""
  }`

  try {
    await postData({
      path,
      body: leasingInterest,
      options: otherOptions,
    })

    return {
      tag: "success",
      result: leasingInterest,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
