import { postData, Service, handleValidationError } from "../../base"

import { WithValidationError } from "../../types/withValidationError"

const wrappedFetchLeasingFormUrl = async ({
  listingId,
  locale,
}): Promise<WithValidationError<{ url: string }>> => {
  try {
    const result = await postData(
      Service.CAR,
      `listings/${listingId}/leasing/generate-provider-form-url`,
      { language: locale }
    )

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
}): Promise<string | null> => {
  const response = await wrappedFetchLeasingFormUrl(args)

  switch (response.tag) {
    case "success":
      return response.result.url
    case "error":
      return null
  }
}
