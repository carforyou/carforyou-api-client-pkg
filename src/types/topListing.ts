import { SearchListing } from "./models/listing"

export type WithTopListing<T> = T & {
  topListing?: SearchListing
}
