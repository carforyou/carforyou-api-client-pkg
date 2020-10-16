import {
  fetchPath,
  postData,
  handleValidationError,
  ApiCallOptions,
} from "../base"

import { WithValidationError } from "../types/withValidationError"
import { Product, PurchaseAndUseProduct } from "../types/models/product"

import { withTokenRefresh } from "../tokenRefresh"

export const fetchProducts = async ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<Product[]> =>
  withTokenRefresh(async () => fetchPath({ path: "products", options }))

export const purchaseAndUseListingProduct = async ({
  dealerId,
  listingId,
  productId,
  options = {},
}: {
  dealerId: number
  listingId: number
  productId: number
  options?: ApiCallOptions
}): Promise<WithValidationError<PurchaseAndUseProduct>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await postData({
        path: `dealers/${dealerId}/listings/${listingId}/products/purchase-and-use`,
        body: {
          productId,
        },
        options,
      })
      return {
        tag: "success",
        result,
      }
    } catch (error) {
      return handleValidationError(error)
    }
  })
}

export const purchaseAndUseDealerProduct = async ({
  dealerId,
  productId,
  startDate,
  options = {},
}: {
  dealerId: number
  productId: number
  startDate: string
  options?: ApiCallOptions
}): Promise<WithValidationError<PurchaseAndUseProduct>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await postData({
        path: `dealers/${dealerId}/products/purchase-and-use`,
        body: {
          productId,
          startDate,
        },
        options,
      })
      return {
        tag: "success",
        result,
      }
    } catch (error) {
      return handleValidationError(error)
    }
  })
}
