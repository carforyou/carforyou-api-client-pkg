import { WithValidationError } from "../../types/withValidationError"
import { PaginationParams } from "../../types/params"
import { Paginated } from "../../types/pagination"
import { MessageLead, SearchMessageLead } from "../../types/models"
import toQueryString from "../../lib/toQueryString"
import { createApiPathWithValidate } from "../../lib/path"
import { pageOrDefault, sizeOrDefault } from "../../lib/pageParams"
import {
  ApiCallOptions,
  fetchPath,
  ignoreServerSideErrors,
  postData,
} from "../../base"

export const defaultDealerMessageLeadsPagination = {
  page: 0,
  size: 10,
}

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
  query,
  options = {},
}: {
  dealerId: number
  query: PaginationParams
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<Paginated<SearchMessageLead>> => {
  const { validateOnly, ...otherOptions } = options
  const { page, size } = query

  const queryParams = {
    page: pageOrDefault(page, defaultDealerMessageLeadsPagination),
    size: sizeOrDefault(size, defaultDealerMessageLeadsPagination),
  }

  const path = `dealers/${dealerId}/message-leads?${toQueryString(queryParams)}`

  return await fetchPath({
    path,
    options: {
      ...otherOptions,
      isAuthorizedRequest: true,
    },
  })
}
