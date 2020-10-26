import {
  fetchAnalyticsData,
  fetchLeadsAnalytics,
  fetchListingsAnalytics,
} from "../analytics"

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
        query: { verificationDateFrom: "2020-10-20" },
        options: { accessToken: "TOKEN" },
      })

      expect(data).toEqual(analyticsData)
      expect(fetch).toHaveBeenCalled()
    })

    it("sends query in the request body", async () => {
      await fetchLeadsAnalytics({
        dealerId: 123,
        query: { verificationDateFrom: "2020-10-20" },
        options: { accessToken: "TOKEN" },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/dealers/123/leads/analytics`),
        expect.objectContaining({
          body: JSON.stringify({
            function: "count",
            query: { verificationDateFrom: "2020-10-20" },
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
})