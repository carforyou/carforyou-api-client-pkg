import { WithValidationError } from "../../types/withValidationError"
import { Language } from "../../types/params"
import { LeasingInterest } from "../../types/models"
import { createApiPathWithValidate } from "../../lib/path"
import { ApiCallOptions, handleValidationError, postData } from "../../base"

const wrappedFetchLeasingFormUrl = async ({
  listingId,
  language,
  options = {},
}: {
  listingId: number
  language: Language
  options?: ApiCallOptions
}): Promise<WithValidationError<{ url: string }>> => {
  try {
    const result = await postData({
      path: `listings/${listingId}/leasing/generate-provider-form-url`,
      body: { language: language },
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
  language: Language
  options?: ApiCallOptions
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
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<WithValidationError<LeasingInterest>> => {
  const { validateOnly, ...otherOptions } = options

  const path = createApiPathWithValidate(
    `listings/${listingId}/leasing/interests`,
    validateOnly
  )

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
