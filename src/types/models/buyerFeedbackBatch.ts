import { ApiSearchListing } from "../../types/models/listing"

export interface BuyerFeedbackDealer {
  id: number
  name: string
  location: {
    city: string
    zipCode: string
  }
}

export interface BuyerFeedbackListing
  extends Pick<ApiSearchListing, "id" | "make" | "model" | "price" | "type"> {
  image: {
    s3Key: string
  }
  dealer: BuyerFeedbackDealer
}

export interface BuyerFeedbackEntry {
  key: string
  listing: BuyerFeedbackListing
}

export interface BuyerFeedbackEntries {
  buyerFeedbackEntries: BuyerFeedbackEntry[]
}
