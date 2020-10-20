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
  options = {},
}: {
  dealerId: number
  dimensions?: string[]
  query?: { verificationDateFrom: string }
  options?: ApiCallOptions
}): Promise<Array<CockpitAnalytics>> => {
  return postData({
    path: `dealers/${dealerId}/leads/analytics`,
    body: {
      function: "count",
      dimensions,
      query,
    },
    options,
  })
}

export const fetchListingsAnalytics = async ({
  dealerId,
  dimensions,
  options = {},
}: {
  dealerId: number
  dimensions?: string[]
  options?: ApiCallOptions
}): Promise<Array<CockpitAnalytics>> => {
  return postData({
    path: `dealers/${dealerId}/listings/analytics`,
    body: {
      function: "count",
      dimensions,
    },
    options,
  })
}
