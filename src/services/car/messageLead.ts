import { postData, handleValidationError, Service } from "../../base"

import { WithValidationError } from "../../types/withValidationError"
import { MessageLead } from "../../types/models"

export const sendMessageLead = async (
  listingId: number,
  messageLead: MessageLead,
  options = {}
): Promise<WithValidationError<MessageLead>> => {
  const {
    videoCallPreference: {
      available = false,
      services = [],
      otherService = null,
    },
    ...messageLeadBase
  } = { ...{ videoCallPreference: {} }, ...messageLead }
  const { validateOnly, recaptchaToken } = {
    validateOnly: false,
    recaptchaToken: null,
    ...options,
  }
  const path = `listings/${listingId}/message-leads${
    validateOnly ? "/validate" : ""
  }`

  try {
    await postData(
      Service.CAR,
      path,
      {
        ...messageLeadBase,
        videoCallPreference: {
          available,
          services: [...services, otherService].filter(Boolean),
        },
      },
      recaptchaToken ? { "Recaptcha-Token": recaptchaToken } : {}
    )

    return {
      tag: "success",
      result: messageLead,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
