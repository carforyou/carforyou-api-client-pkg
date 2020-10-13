import { postData, Service } from "../base"

import {
  DealerListingsAnalyticsData,
  LeadsAnalytics,
  ListingsAnalytics,
} from "../types/models"

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

export const fetchLeadsAnalytics = async (
  dealerId: number,
  dimensions?: string[],
  query?: { verificationDateFrom: string }
): Promise<LeadsAnalytics> => {
  return postData(Service.ANALYTICS, `dealers/${dealerId}/leads/analytics`, {
    function: "count",
    dimensions,
    query,
  })
}

export const fetchListingsAnalytics = async (
  dealerId: number,
  dimensions?: string[]
): Promise<ListingsAnalytics> => {
  return postData(Service.ANALYTICS, `dealers/${dealerId}/listings/analytics`, {
    function: "count",
    dimensions,
  })
}
