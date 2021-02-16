import {
  fetchProducts,
  purchaseAndUseDealerProduct,
  purchaseAndUseListingProduct,
} from "../product"

describe("Products service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("#fetchProducts", () => {
    const products = [
      {
        id: 1,
        price: 350,
        standardPrice: 350,
        feature: "garage-promotion",
      },
    ]

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(products))
    })

    it("fetches products", async () => {
      const data = await fetchProducts({ options: { accessToken: "Token" } })

      expect(data).toEqual(products)
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe("#purchaseAndUseListingProduct", () => {
    it("returns success data for successful purchases", async () => {
      const purchaseData = { success: true, description: "gold-listing" }
      fetchMock.mockResponse(JSON.stringify(purchaseData))

      const response = await purchaseAndUseListingProduct({
        dealerId: 123,
        listingId: 4,
        productId: 2,
        options: { accessToken: "Token" },
      })

      expect(response).toEqual({
        tag: "success",
        result: purchaseData,
      })
      expect(fetch).toBeCalledWith(
        expect.stringContaining(
          "/dealers/123/listings/4/products/purchase-and-use"
        ),
        expect.objectContaining({
          body: JSON.stringify({ productId: 2 }),
        })
      )
    })

    it("handles validation errors", async () => {
      const message = "not-valid"
      const errors = [
        { param: "startDate", message: "validation.field.not-empty" },
      ]
      fetchMock.mockResponses([
        JSON.stringify({
          message,
          errors,
        }),
        { status: 400 },
      ])

      const response = await purchaseAndUseListingProduct({
        dealerId: 123,
        listingId: 4,
        productId: 2,
        options: { accessToken: "Token" },
      })

      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })

  describe("#purchaseAndUseDealerProduct", () => {
    it("returns success data for successful purchases", async () => {
      const purchaseData = { success: true, description: "gold-listing" }
      fetchMock.mockResponse(JSON.stringify(purchaseData))

      const response = await purchaseAndUseDealerProduct({
        dealerId: 123,
        productId: 2,
        startDate: "2020-10-11",
        options: { accessToken: "Token" },
      })

      expect(response).toEqual({
        tag: "success",
        result: purchaseData,
      })
      expect(fetch).toBeCalledWith(
        expect.stringContaining("/dealers/123/products/purchase-and-use"),
        expect.objectContaining({
          body: JSON.stringify({ productId: 2, startDate: "2020-10-11" }),
        })
      )
    })

    it("handles validation errors", async () => {
      const message = "not-valid"
      const errors = [
        { param: "startDate", message: "validation.field.not-empty" },
      ]
      fetchMock.mockResponses([
        JSON.stringify({
          message,
          errors,
        }),
        { status: 400 },
      ])

      const response = await purchaseAndUseDealerProduct({
        dealerId: 123,
        productId: 2,
        startDate: "",
        options: { accessToken: "Token" },
      })

      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })
})
