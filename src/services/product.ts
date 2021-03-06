import { WithValidationError } from "../types/withValidationError"
import { Product, PurchaseAndUseProduct } from "../types/models/product"
import {
  ApiCallOptions,
  fetchPath,
  handleValidationError,
  postData,
} from "../base"

export const fetchProducts = async ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<Product[]> =>
  fetchPath({
    path: "products",
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

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
  try {
    const result = await postData({
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

export const bulkPurchaseAndUseListingsProduct = async ({
  dealerId,
  elements,
  options = {},
}: {
  dealerId: number
  elements: {
    categoryMakeKey?: string
    categoryModelKey?: string
    listingId: number
    productId: number
  }[]
  options?: ApiCallOptions
}): Promise<WithValidationError<PurchaseAndUseProduct>> => {
  try {
    const result = await postData({
      path: `dealers/${dealerId}/listings/products/bulk-purchase-and-use`,
      body: {
        elements,
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
  try {
    const result = await postData({
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
