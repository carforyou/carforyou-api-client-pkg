import {
  fetchPath,
  Service,
  postData,
  handleValidationError,
  RequestOptions,
} from "../base"

import { WithValidationError } from "../types/withValidationError"
import { Product, PurchaseAndUseProduct } from "../types/models/product"

export const fetchProducts = async (
  options: RequestOptions = {}
): Promise<Product[]> =>
  fetchPath({
    service: Service.DEALER,
    path: "products",
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

export const purchaseAndUseListingProduct = async (
  dealerId: number,
  listingId: number,
  productId: number,
  options: RequestOptions = {}
): Promise<WithValidationError<PurchaseAndUseProduct>> => {
  try {
    const result = await postData({
      service: Service.DEALER,
      path: `dealers/${dealerId}/listings/${listingId}/products/purchase-and-use`,
      body: {
        productId,
      },
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const purchaseAndUseDealerProduct = async (
  dealerId: number,
  productId: number,
  startDate: string,
  options: RequestOptions = {}
): Promise<WithValidationError<PurchaseAndUseProduct>> => {
  try {
    const result = await postData({
      service: Service.DEALER,
      path: `dealers/${dealerId}/products/purchase-and-use`,
      body: {
        productId,
        startDate,
      },
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
