import { Paginated } from "../../types/pagination"
import { CarSales } from "../../types/models/carSales"

import toQueryString from "../../lib/toQueryString"
import { ApiCallOptions, fetchPath } from "../../base"

export const fetchCarSales = async ({
  dealerId,
  status,
  page,
  size,
  options = {},
}: {
  dealerId: number
  status: string
  page?: number
  size?: number
  options?: ApiCallOptions
}): Promise<Paginated<CarSales>> => {
  const query = toQueryString({ status, page, size })
  return fetchPath({
    path: `dealers/${dealerId}/car-sales${query ? `?${query}` : ""}`,
    options: { isAuthorizedRequest: true, ...options },
  })
}
