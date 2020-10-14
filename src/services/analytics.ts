import { postData, RequestOptions } from "../base"

import { DealerListingsAnalyticsData } from "../types/models"

export const fetchAnalyticsData = async ({
  dealerId,
  listingIds,
  options = {},
}: {
  dealerId: number
  listingIds: number[]
  options?: RequestOptions
}): Promise<DealerListingsAnalyticsData> => {
  return postData({
    path: `analytics/dealers/${dealerId}/listings/metrics`,
    body: {
      id: listingIds,
    },
    options,
  })
}
