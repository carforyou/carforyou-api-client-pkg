import { postData, ApiCallOptions } from "../base"

import { DealerListingsAnalyticsData, CockpitAnalytics } from "../types/models"

export const fetchAnalyticsData = async ({
  dealerId,
  listingIds,
  options = {},
}: {
  dealerId: number
  listingIds: number[]
  options?: ApiCallOptions
}): Promise<DealerListingsAnalyticsData> => {
  return postData({
    path: `analytics/dealers/${dealerId}/listings/metrics`,
    body: {
      id: listingIds,
    },
    options,
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
