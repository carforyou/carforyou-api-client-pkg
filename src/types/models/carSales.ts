import { ApiSearchListing } from "../../types/models/listing"
import { SearchMessageLead } from "../../types/models"

export interface Buyer {
  email: string
  firstName: string
  lastName: string
  phone: string
}

export type FirstListingParams = Pick<
  ApiSearchListing,
  "id" | "firstRegistrationDate" | "price" | "mileage"
>

export type SecondListingParams = SearchMessageLead["listing"]

export interface CarSales {
  buyer: Buyer
  carSaleDate: string
  id: number
  listing: [FirstListingParams, SecondListingParams]
}
