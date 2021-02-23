import { ApiSearchListing } from "../../types/models/listing"

export interface Buyer {
  email: string
  firstName: string
  lastName: string
  phone: string
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
  image: string
}

export interface CarSales {
  buyer: Buyer
  carSaleDate: string
  id: number
  listing: CarSalesListing
}

export interface CarSaleRejection {
  comment?: string
  reason: "car-not-sold" | "wrong-buyer"
}
