import { WithValidationError } from "../../types/withValidationError"
import { Paginated } from "../../types/pagination"
import { MessageLead, MessageLeadsListItem } from "../../types/models"
import toQueryString from "../../lib/toQueryString"
import { createApiPathWithValidate } from "../../lib/path"
import {
  ApiCallOptions,
  fetchPath,
  ignoreServerSideErrors,
  postData,
} from "../../base"

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

  const path = createApiPathWithValidate(
    `listings/${listingId}/message-leads`,
    validateOnly
  )

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
      options: {
        ...otherOptions,
        apiVersion: "v2",
      },
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

export const fetchDealerMessageLeads = async ({
  dealerId,
  page = 0,
  size = 7,
  options = {},
}: {
  dealerId: number
  page: number
  size?: number
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<Paginated<MessageLeadsListItem>> => {
  const { validateOnly, ...otherOptions } = options

  const path = createApiPathWithValidate(
    `dealers/${dealerId}/message-leads`,
    validateOnly
  )
  const query = toQueryString({ page, size })

  return await fetchPath({
    path: `${path}?${query}`,
    options: {
      ...otherOptions,
      isAuthorizedRequest: true,
    },
  })
}
