import {
  CockpitAnalytics,
  DealerAnalytics,
  DealerListingsAnalyticsData,
} from "../types/models"
import { ApiCallOptions, postData } from "../base"

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

export const fetchLeadsAnalytics = async ({
  dealerId,
  dimensions,
  options = {},
}: {
  dealerId: number
  dimensions?: string[]
  options?: ApiCallOptions
}): Promise<Array<CockpitAnalytics>> => {
  return postData({
    path: `dealers/${dealerId}/leads/analytics`,
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

export const fetchLeadsInteractionsAnalytics = async ({
  dealerId,
  dimensions,
  options = {},
}: {
  dealerId: number
  dimensions?: string[]
  options?: ApiCallOptions
}): Promise<Array<CockpitAnalytics>> => {
  return postData({
    path: `dealers/${dealerId}/lead-interactions/analytics`,
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

export const fetchDealerAnalytics = async ({
  dealerId,
  dimensions,
  metrics,
  query,
  options = {},
}: {
  dealerId: number
  dimensions: string[]
  metrics: { name: string }[]
  query: {
    period: string
  }
  options?: ApiCallOptions
}): Promise<Array<DealerAnalytics>> => {
  return postData({
    path: `dealers/${dealerId}/analytics`,
    body: {
      dimensions,
      metrics,
      query,
    },
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}
