import { PartialSearchListing } from "../../types/models/listing"

export interface BuyerFeedbackDealer {
  id: number
  name: string
  location: {
    city: string
    zipCode: string
  }
}

export interface BuyerFeedbackListing extends PartialSearchListing {
  dealer: BuyerFeedbackDealer
}

export interface BuyerFeedbackEntry {
  key: string
  listing: BuyerFeedbackListing
}

export interface BuyerFeedbackEntries {
  buyerFeedbackEntries: BuyerFeedbackEntry[]
}
