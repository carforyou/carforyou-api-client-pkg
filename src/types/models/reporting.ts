import { Listing } from "../../index"

export type UserMessageLeadListing = Pick<
  Listing,
  | "externalListingId"
  | "make"
  | "mileage"
  | "model"
  | "price"
  | "referenceId"
  | "type"
> & { image: string }

export interface UserMessageLead {
  createdDate: string
  id: number
  listing: UserMessageLeadListing
}
