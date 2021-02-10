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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dealerId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  metrics,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  period,
  fnc,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options = {},
}: {
  dealerId: number
  metrics: string[]
  period: string
  fnc: "avg" | "sum"
  options?: ApiCallOptions
}): Promise<DealerAnalytics> => {
  // Uncomment the code below once the backend endpoint is ready
  /*
  return postData({
    path: `dealers/${dealerId}/analytics`,
    body: {
      metrics,
      period,
      function: fnc,
    },
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
  */

  /* Mock response of this function */
  const res =
    fnc === "sum"
      ? {
          pdpViews: 12400,
          srpViews: 7200,
        }
      : {
          pdpViewsDaily: 25,
        }
  return new Promise((resolve, _) => {
    return resolve(res)
  })
}
