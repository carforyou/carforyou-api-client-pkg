import { PartialSearchListing, SearchListingDealer } from "./listing"
export interface UserMessageLead {
  createdDate: string
  id: number
  listing: PartialSearchListing
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
