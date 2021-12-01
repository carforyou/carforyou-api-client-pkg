import toQueryString from "../../lib/toQueryString"
import { Paginated, UserMessageLead } from "../../index"
import { ApiCallOptions, fetchPath } from "../../base"

export const fetchMessageLeads = async ({
  offset,
  page,
  size,
  createdDateFrom,
  options = {},
}: {
  offset?: number
  page?: number
  size?: number
  createdDateFrom?: string
  options?: ApiCallOptions
} = {}): Promise<Paginated<UserMessageLead>> => {
  const query = toQueryString({ offset, page, size, createdDateFrom })
  return fetchPath({
    path: `users/me/message-leads${query ? "?" + query : ""}`,
    options: { isAuthorizedRequest: true, ...options },
  })
}
