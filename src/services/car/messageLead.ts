import { WithValidationError } from "../../types/withValidationError"
import { LeadSortTypeParams, SortOrderParams } from "../../types/sort"
import { LeadQueryParams } from "../../types/params/leads"
import { Paginated } from "../../types/pagination"
import {
  MessageLead,
  SearchCallLead,
  SearchMessageLead,
} from "../../types/models"
import toQueryString from "../../lib/toQueryString"
import toCamelCase from "../../lib/toCamelCase"
import { createApiPathWithValidate } from "../../lib/path"
import { pageOrDefault, sizeOrDefault } from "../../lib/pageParams"
import {
  ApiCallOptions,
  fetchPath,
  handleValidationError,
  ignoreServerSideErrors,
  postData,
} from "../../base"

export const defaultDealerMessageLeadsPagination = {
  page: 0,
  size: 10,
}

export const defaultLeadSort = {
  sortType: LeadSortTypeParams.CREATED_DATE,
  sortOrder: SortOrderParams.DESC,
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
  const { page, size, sort = {}, searchQuery } = query

  const { sortOrder, sortType } = sort

  const sortOrDefault = {
    sortType: sortType || defaultLeadSort.sortType,
    sortOrder: sortOrder || defaultLeadSort.sortOrder,
  }

  const queryParams = {
    page: pageOrDefault(page, defaultDealerMessageLeadsPagination),
    size: sizeOrDefault(size, defaultDealerMessageLeadsPagination),
    sort: `${toCamelCase(sortOrDefault.sortType)},${toCamelCase(
      sortOrDefault.sortOrder
    )}`,
    q:
      searchQuery && searchQuery.length >= 3
        ? encodeURIComponent(searchQuery)
        : "",
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

export const hideMessageLead = async ({
  dealerId,
  messageLeadId,
  options = {},
}: {
  dealerId: number
  messageLeadId: number
  options: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `dealers/${dealerId}/message-leads/${messageLeadId}/hide`,
      body: {},
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: {},
  }
}

export const fetchDealerCallLeads = async ({
  dealerId,
  query,
  options = {},
}: {
  dealerId: number
  query: LeadQueryParams
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<Paginated<SearchCallLead>> => {
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
    sort: `${toCamelCase(sortOrDefault.sortType)},${toCamelCase(
      sortOrDefault.sortOrder
    )}`,
  }

  const path = `dealers/${dealerId}/call-leads?${toQueryString(queryParams)}`

  return await fetchPath({
    path,
    options: {
      ...otherOptions,
      isAuthorizedRequest: true,
    },
  })
}

export const hideCallLead = async ({
  dealerId,
  callLeadId,
  options = {},
}: {
  dealerId: number
  callLeadId: number
  options: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `dealers/${dealerId}/call-leads/${callLeadId}/hide`,
      body: {},
      options: {
        ...options,
        isAuthorizedRequest: true,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: {},
  }
}
