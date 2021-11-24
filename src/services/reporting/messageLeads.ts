import toQueryString from "../../lib/toQueryString"
import { Paginated, UserMessageLead } from "../../index"
import { ApiCallOptions, fetchPath } from "../../base"

export const fetchMessageLeads = async ({
  offset,
  page,
  size,
  options = {},
}: {
  offset?: number
  page?: number
  size?: number
  options?: ApiCallOptions
} = {}): Promise<Paginated<UserMessageLead>> => {
  console.log("accces", options)

  const query = toQueryString({ offset, page, size })
  return fetchPath({
    path: `users/me/message-leads${query ? "?" + query : ""}`,
    options: { isAuthorizedRequest: true, ...options },
  })
}
