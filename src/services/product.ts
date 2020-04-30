import { fetchPath, Service, postData, handleValidationError } from "../base"

import { WithValidationError } from "../types/withValidationError"
import { Product, PurchaseAndUseProduct } from "../types/models/product"

import { withTokenRefresh } from "../tokenRefresh"

export const fetchProducts = async (): Promise<Product[]> => {
  return fetchPath(Service.DEALER, "products")
}

export const purchaseAndUseProduct = async (
  dealerId: number,
  listingId: number,
  productId: number
): Promise<WithValidationError<PurchaseAndUseProduct>> => {
  return withTokenRefresh(async () => {
    try {
      const result = postData(
        Service.DEALER,
        `dealers/${dealerId}/listings/${listingId}/products/purchase-and-use`,
        {
          productId
        }
      )
      return {
        tag: "success",
        result
      }
    } catch (error) {
      return handleValidationError(error)
    }
  })
}
