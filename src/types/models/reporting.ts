import { SearchListingDealer, SimpleSearchListing } from "./listing"
export interface UserMessageLead {
  createdDate: string
  id: number
  listing: SimpleSearchListing
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
