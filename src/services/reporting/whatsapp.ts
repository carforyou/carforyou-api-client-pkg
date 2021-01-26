import { WithValidationError } from "../../types/withValidationError"
import { WhatsappEntry } from "../../types/models"
import { ApiCallOptions, ignoreServerSideErrors, postData } from "../../base"

export const postWhatsappTrackingEntry = async ({
  listingId,
  whatsappEntry,
  options = {},
}: {
  listingId: number
  whatsappEntry: WhatsappEntry
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<WithValidationError<WhatsappEntry>> => {
  const { validateOnly, ...otherOptions } = options

  const path = `listings/${listingId}/whats-app-tracking-entries${
    validateOnly ? "/validate" : ""
  }`

  try {
    await postData({
      path,
      body: {
        ...whatsappEntry,
      },
      options: {
        ...otherOptions,
        apiVersion: "v2",
      },
    })
    return {
      tag: "success",
      result: whatsappEntry,
    }
  } catch (error) {
    return ignoreServerSideErrors({
      error,
      errorHandlerOptions: { swallowErrors: true },
      returnValue: whatsappEntry,
    })
  }
}
