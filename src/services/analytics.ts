import { postData, ApiCallOptions, fetchPath } from "../base"

import {
  DealerListingsAnalyticsData,
  CockpitAnalytics,
  LeadsCount,
} from "../types/models"

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
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}

export const fetchLeadsImpressions = async ({
  dealerId,
  dimensions,
  options = {},
}: {
  dealerId: number
  dimensions?: string[]
  options?: ApiCallOptions
}): Promise<Array<CockpitAnalytics>> => {
  return postData({
    path: `dealers/${dealerId}/leads/impressions`,
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
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}

export const fetchLeadsCount = async ({
  id,
  options = {},
}: {
  id: number
  options?: ApiCallOptions
}): Promise<LeadsCount> => {
  return fetchPath({
    path: `dealers/${id}/leads/count`,
    options,
  })
}
