import { postData, RequestOptions, Service } from "../base"

import { DealerListingsAnalyticsData } from "../types/models"

export const fetchAnalyticsData = async (
  dealerId: number,
  listingIds: number[],
  options: RequestOptions
): Promise<DealerListingsAnalyticsData> => {
  return postData({
    service: Service.ANALYTICS,
    path: `analytics/dealers/${dealerId}/listings/metrics`,
    body: {
      id: listingIds,
    },
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}
