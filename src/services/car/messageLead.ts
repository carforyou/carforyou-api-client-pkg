import { postData, ApiCallOptions, ignoreServerSideErrors } from "../../base"

import { WithValidationError } from "../../types/withValidationError"
import { MessageLead } from "../../types/models"

export const sendMessageLead = async ({
  listingId,
  messageLead,
  options = {},
}: {
  listingId: number
  messageLead: MessageLead
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<WithValidationError<MessageLead>> => {
  const {
    videoCallPreference: {
      available = false,
      services = [],
      otherService = null,
    },
    ...messageLeadBase
  } = { ...{ videoCallPreference: {} }, ...messageLead }
  const { validateOnly, ...otherOptions } = options

  const path = `listings/${listingId}/message-leads${
    validateOnly ? "/validate" : ""
  }`

  try {
    await postData({
      path,
      body: {
        ...messageLeadBase,
        videoCallPreference: {
          available,
          services: [...services, otherService].filter(Boolean),
        },
      },
      options: otherOptions,
    })

    return {
      tag: "success",
      result: messageLead,
    }
  } catch (error) {
    return ignoreServerSideErrors({
      error,
      errorHandlerOptions: { swallowErrors: true },
      returnValue: messageLead,
    })
  }
}
