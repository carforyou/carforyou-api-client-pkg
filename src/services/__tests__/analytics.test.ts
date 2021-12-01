import fetchMock from "jest-fetch-mock"

import {
  fetchAnalyticsData,
  fetchDealerAnalytics,
  fetchLeadsAnalytics,
  fetchLeadsInteractionsAnalytics,
  fetchListingsAnalytics,
} from "../analytics"
import { DealerAnalytics } from "../../types/models"

describe("Analytics service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("#fetchAnalyticsData", () => {
    const analyticsData = {
      listings: [
        {
          id: 1,
          stats: {
            callLeads: 4,
            messageLeads: 3,
            pdpViews: 7,
            pdpViewsByFeature: {},
          },
        },
      ],
    }

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(analyticsData))
    })

    it("fetches the data", async () => {
      const data = await fetchAnalyticsData({
        dealerId: 123,
        listingIds: [1],
        options: { accessToken: "TOKEN" },
      })

      expect(data).toEqual(analyticsData)
      expect(fetch).toHaveBeenCalled()
    })

    it("sends listing ids in the request body", async () => {
      await fetchAnalyticsData({
        dealerId: 123,
        listingIds: [1],
        options: { accessToken: "TOKEN" },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/analytics/dealers/123/listings/metrics`),
        expect.objectContaining({
          body: JSON.stringify({
            id: [1],
          }),
        })
      )
    })
  })

  describe("#fetchLeadsAnalytics", () => {
    const analyticsData = [
      {
        count: 10,
      },
    ]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(analyticsData))
    })

    it("fetches the data", async () => {
      const data = await fetchLeadsAnalytics({
        dealerId: 123,
        options: { accessToken: "TOKEN" },
      })

      expect(data).toEqual(analyticsData)
      expect(fetch).toHaveBeenCalled()
    })

    it("sends query in the request body", async () => {
      await fetchLeadsAnalytics({
        dealerId: 123,
        options: { accessToken: "TOKEN" },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/dealers/123/leads/analytics`),
        expect.objectContaining({
          body: JSON.stringify({
            function: "count",
          }),
        })
      )
    })
  })

  describe("#fetchLeadsInteractionsAnalytics", () => {
    const analyticsData = [
      {
        type: "message",
        count: 25,
      },
      {
        type: "call",
        count: 30,
      },
    ]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(analyticsData))
    })

    it("fetches the data", async () => {
      const data = await fetchLeadsInteractionsAnalytics({
        dealerId: 123,
        dimensions: ["type"],
        options: { accessToken: "TOKEN" },
      })

      expect(data).toEqual(analyticsData)
      expect(fetch).toHaveBeenCalled()
    })

    it("sends query in the request body", async () => {
      await fetchLeadsAnalytics({
        dealerId: 123,
        options: { accessToken: "TOKEN" },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/dealers/123/leads/analytics`),
        expect.objectContaining({
          body: JSON.stringify({
            function: "count",
          }),
        })
      )
    })
  })

  describe("#fetchListingsAnalytics", () => {
    const analyticsData = [
      {
        count: 10,
        makeKey: "audi",
      },
      {
        count: 5,
        makeKey: "bmw",
      },
    ]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(analyticsData))
    })

    it("fetches the data", async () => {
      const data = await fetchListingsAnalytics({
        dealerId: 123,
        dimensions: ["makeKey"],
        options: { accessToken: "TOKEN" },
      })

      expect(data).toEqual(analyticsData)
      expect(fetch).toHaveBeenCalled()
    })

    it("sends dimensions in the request body", async () => {
      await fetchListingsAnalytics({
        dealerId: 123,
        dimensions: ["makeKey"],
        options: { accessToken: "TOKEN" },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/dealers/123/listings/analytics`),
        expect.objectContaining({
          body: JSON.stringify({
            function: "count",
            dimensions: ["makeKey"],
          }),
        })
      )
    })
  })

  describe("#fetchDealerAnalytics", () => {
    const tilesData: DealerAnalytics[] = [
      {
        dimensions: {},
        metrics: [
          {
            name: "srpViews",
            value: 123,
          },
          {
            name: "pdpViews",
            value: 42,
          },
          {
            name: "pdpViewsAvg",
            value: 4,
          },
          {
            name: "pdpViewsPerListingAvg",
            value: 2,
          },
          {
            name: "callLeads",
            value: 24,
          },
          {
            name: "messageLeads",
            value: 13,
          },
          {
            name: "whatsAppTrackingEntries",
            value: 5,
          },
        ],
      },
    ]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(tilesData))
    })

    it("fetches tiles data", async () => {
      const data = await fetchDealerAnalytics({
        dealerId: 123,
        dimensions: [],
        metrics: [
          {
            name: "srpViews",
          },
          {
            name: "pdpViews",
          },
          {
            name: "pdpViewsAvg",
          },
          {
            name: "pdpViewsPerListingAvg",
          },
          {
            name: "callLeads",
          },
          {
            name: "messageLeads",
          },
          {
            name: "whatsAppTrackingEntries",
          },
        ],
        query: {
          period: "30d",
        },
        options: { accessToken: "TOKEN" },
      })

      expect(data).toEqual(tilesData)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
