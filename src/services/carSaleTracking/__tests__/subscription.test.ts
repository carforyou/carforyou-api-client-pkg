import { fetchCarSaleTrackingSubscription } from "../subscription"

describe("Product", () => {
  beforeEach(fetchMock.resetMocks)

  describe("#fetchCarSaleTrackingSubscription", () => {
    const subscription = {
      basePrice: 400,
      capping: 2,
      contingent: 3,
      endDate: "2021-05-14T10:08:56.874Z",
      numberOfInvoicedCarSales: 4,
      pricePerCarSale: 200,
      salesContactEmail: "teste@tester.com",
      salesContactName: "Tester",
      startDate: "2021-05-14T10:08:56.874Z",
    }

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(subscription))
    })

    it("fetches car sales tracking subscription", async () => {
      const data = await fetchCarSaleTrackingSubscription({
        dealerId: 123,
        options: { accessToken: "Token" },
      })

      expect(data).toEqual(subscription)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
