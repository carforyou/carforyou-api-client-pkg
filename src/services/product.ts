import { fetchPath, Service, postData, handleValidationError } from "../base"

import { WithValidationError } from "../types/withValidationError"
import { Product, PurchaseAndUseProduct } from "../types/models/product"

import { withTokenRefresh } from "../tokenRefresh"

export const fetchProducts = async (): Promise<Product[]> =>
  withTokenRefresh(async () => fetchPath(Service.DEALER, "products"))

export const purchaseAndUseListingProduct = async (
  dealerId: number,
  listingId: number,
  productId: number
): Promise<WithValidationError<PurchaseAndUseProduct>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await postData(
        Service.DEALER,
        `dealers/${dealerId}/listings/${listingId}/products/purchase-and-use`,
        {
          productId,
        }
      )
      return {
        tag: "success",
        result,
      }
    } catch (error) {
      return handleValidationError(error)
    }
  })
}

export const purchaseAndUseDealerProduct = async (
  dealerId: number,
  productId: number,
  startDate: string
): Promise<WithValidationError<PurchaseAndUseProduct>> => {
  return withTokenRefresh(async () => {
    try {
      const result = await postData(
        Service.DEALER,
        `dealers/${dealerId}/products/purchase-and-use`,
        {
          productId,
          startDate,
        }
      )
      return {
        tag: "success",
        result,
      }
    } catch (error) {
      return handleValidationError(error)
    }
  })
}
