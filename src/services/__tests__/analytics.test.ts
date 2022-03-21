import { fetchAnalyticsData, fetchDealerAnalytics } from "../analytics"
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
