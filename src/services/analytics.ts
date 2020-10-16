import { postData, Service } from "../base"

import { DealerListingsAnalyticsData, CockpitAnalytics } from "../types/models"

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
