import { postData, Service } from "../base"

import { DealerListingsAnalyticsData } from "../types/models"

export const fetchAnalyticsData = async (
  dealerId: number,
  listingIds: number[]
): Promise<DealerListingsAnalyticsData> => {
  return postData(
    Service.ANALYTICS,
    `analytics/dealers/${dealerId}/listings/metrics`,
    {
      id: listingIds,
    }
  )
}
