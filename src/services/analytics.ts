import { postData, RequestOptions, Service } from "../base"

import { DealerListingsAnalyticsData, CockpitAnalytics } from "../types/models"

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

export const fetchLeadsAnalytics = async ({
  dealerId,
  dimensions,
  query,
}: {
  dealerId: number
  dimensions?: string[]
  query?: { verificationDateFrom: string }
}): Promise<CockpitAnalytics> => {
  return postData(Service.ANALYTICS, `dealers/${dealerId}/leads/analytics`, {
    function: "count",
    dimensions,
    query,
  })
}

export const fetchListingsAnalytics = async ({
  dealerId,
  dimensions,
}: {
  dealerId: number
  dimensions?: string[]
}): Promise<CockpitAnalytics> => {
  return postData(Service.ANALYTICS, `dealers/${dealerId}/listings/analytics`, {
    function: "count",
    dimensions,
  })
}
