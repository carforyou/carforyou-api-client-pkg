import { fetchPath, Service, postData } from "../base"

import { Product, PurchaseAndUseProduct } from "../types/models/product"

export const fetchProducts = async (): Promise<Product[]> => {
  return fetchPath(Service.DEALER, "products")
}

export const purchaseAndUseProduct = async (
  dealerId: number,
  listingId: number,
  productId: number
): Promise<PurchaseAndUseProduct> => {
  return postData(
    Service.DEALER,
    `dealers/${dealerId}/listings/${listingId}/products/purchase-and-use`,
    {
      productId
    }
  )
}
