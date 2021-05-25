import { CarSaleTrackingSubscription } from "../../types/models/carSales"

import { ApiCallOptions, fetchPath } from "../../base"

export const fetchCarSaleTrackingSubscription = async ({
  dealerId,
  options = {},
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<CarSaleTrackingSubscription> =>
  fetchPath({
    path: `dealers/${dealerId}/car-sale-tracking-subscription`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
