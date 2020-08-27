export enum Feature {
  garagePromotion = "garage-promotion",
  goldListing = "gold-listing",
  premiumListing = "premium-listing",
}

export type FeatureBooking = {
  feature: Feature
  startDate: string
  endDate: string
}

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
}
