import { Paginated } from "../../types/pagination"
import { CarSales } from "../../types/models/carSales"

import toQueryString from "../../lib/toQueryString"
import { ApiCallOptions, fetchPath } from "../../base"

export const fetchCarSales = async ({
  dealerId,
  page,
  size,
  options = {},
}: {
  dealerId: number
  page?: number
  size?: number
  options?: ApiCallOptions
}): Promise<Paginated<CarSales>> => {
  const query = toQueryString({ page, size })
  return fetchPath({
    path: `dealers/${dealerId}/car-sales${query ? `?${query}` : ""}`,
    options: { isAuthorizedRequest: true, ...options },
  })
}
