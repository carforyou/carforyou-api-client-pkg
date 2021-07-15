import { ApiSearchListing } from "../../types/models/listing"

export interface CarSaleTrackingSubscription {
  basePrice: number
  capping: number
  contingent: number
  endDate: string
  numberOfInvoicedCarSales: number
  pricePerCarSale: number
  salesContactEmail: string
  salesContactName: string
  startDate: string
}

export interface Buyer {
  email: string
  firstName: string
  lastName: string
  phone: string
}

export interface CarSaleRejection {
  comment?: string
  reason: "car-not-sold" | "wrong-buyer" | "other"
}

export interface CarSalesListing
  extends Pick<
    ApiSearchListing,
    | "id"
    | "firstRegistrationDate"
    | "make"
    | "model"
    | "type"
    | "price"
    | "mileage"
  > {
  externalListingId: string
  referenceId: string
  image: string
}

export interface CarSales {
  buyer: Buyer
  carSaleDate: string
  id: number
  listing: CarSalesListing
  rejection: CarSaleRejection | null
  dealerFeedbackReceivedDate: string
  hasDealerFeedback: boolean
}
