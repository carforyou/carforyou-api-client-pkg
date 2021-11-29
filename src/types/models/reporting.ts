import { SearchListingDealer } from "./listing"
import { Listing } from "../../index"

export type UserMessageLeadListing = Pick<
  Listing,
  | "id"
  | "make"
  | "model"
  | "type"
  | "firstRegistrationYear"
  | "mileage"
  | "transmissionType"
  | "fuelType"
  | "price"
  | "buyNowEligible"
  | "verified"
  | "hasBuyerProtection"
  | "leasingMonthlyRate"
  | "gbdScore"
> & {
  image: string
  firstRegistrationDate: string
  dealer: Pick<
    SearchListingDealer,
    "id" | "name" | "dealerSourceGroup" | "dealerType"
  > & {
    location: {
      zipCode: string
      city: string
    }
  }
}

export interface UserMessageLead {
  createdDate: string
  id: number
  listing: UserMessageLeadListing
}
