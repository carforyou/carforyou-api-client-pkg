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

export const fetchLeadsAnalytics = async (
  {
    dealerId,
    dimensions,
    query,
  }: {
    dealerId: number
    dimensions?: string[]
    query?: { verificationDateFrom: string }
  },
  options: RequestOptions
): Promise<CockpitAnalytics> => {
  return postData({
    service: Service.ANALYTICS,
    path: `dealers/${dealerId}/leads/analytics`,
    body: {
      function: "count",
      dimensions,
      query,
    },
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}

export const fetchListingsAnalytics = async (
  {
    dealerId,
    dimensions,
  }: {
    dealerId: number
    dimensions?: string[]
  },
  options: RequestOptions
): Promise<CockpitAnalytics> => {
  return postData({
    service: Service.ANALYTICS,
    path: `dealers/${dealerId}/listings/analytics`,
    body: {
      function: "count",
      dimensions,
    },
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}
