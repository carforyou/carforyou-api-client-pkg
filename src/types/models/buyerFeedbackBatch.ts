import { PartialSearchListing } from "../../types/models/listing"

export interface BuyerFeedbackDealer {
  id: number
  name: string
  location: {
    city: string
    zipCode: string
  }
}

export interface BuyerFeedbackEntry {
  key: string
  listing: PartialSearchListing
}

export interface BuyerFeedbackEntries {
  buyerFeedbackEntries: BuyerFeedbackEntry[]
}
