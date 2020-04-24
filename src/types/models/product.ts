export interface Product {
  id: number
  price: number
  standardPrice: number
  validity?: number
  feature: string
}

export interface PurchaseAndUseProduct {
  success: boolean
  description: string
  errors: [{ message: string; param: string }]
  message: string
}
