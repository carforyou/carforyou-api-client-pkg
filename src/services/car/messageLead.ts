import { WithValidationError } from "../../types/withValidationError"
import { LeadSortOrderParams, LeadSortTypeParams } from "../../types/sort"
import { LeadQueryParams } from "../../types/params/leads"
import { Paginated } from "../../types/pagination"
import { MessageLead, SearchMessageLead } from "../../types/models"
import toQueryString from "../../lib/toQueryString"
import { createApiPathWithValidate } from "../../lib/path"
import { pageOrDefault, sizeOrDefault } from "../../lib/pageParams"
import { toSpringSortLeadParams } from "../../lib/convertParams"
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

export const defaultLeadSort = {
  sortType: LeadSortTypeParams.NEWEST,
  sortOrder: LeadSortOrderParams.ASC,
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
  query: LeadQueryParams
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<Paginated<SearchMessageLead>> => {
  const { validateOnly, ...otherOptions } = options
  const { page, size, sort = {} } = query

  const { sortOrder, sortType } = sort

  const sortOrDefault = {
    sortType: sortType || defaultLeadSort.sortType,
    sortOrder: sortOrder || defaultLeadSort.sortOrder,
  }

  const queryParams = {
    page: pageOrDefault(page, defaultDealerMessageLeadsPagination),
    size: sizeOrDefault(size, defaultDealerMessageLeadsPagination),
    sort: toSpringSortLeadParams(sortOrDefault),
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
