export interface Product {
  id: number
  price: number
  productKey: string
}

export interface PurchaseAndUseProduct {
  description: string
  errors: [{ message: string; param: string }]
  message: string
}
