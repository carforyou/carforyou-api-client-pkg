import { SearchListingDealer } from "./listing"
import { Listing } from "../../index"

export type UserMessageLeadListing = Pick<
  Listing,
  | "id"
  | "make"
  | "model"
  | "type"
  | "firstRegistrationDate"
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
  dealer: Pick<
    SearchListingDealer,
    "id" | "name" | "location" | "dealerSourceGroup" | "dealerType"
  >
}

export interface UserMessageLead {
  createdDate: string
  id: number
  listing: UserMessageLeadListing
}
