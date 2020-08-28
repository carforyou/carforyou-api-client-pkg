import { SearchListing } from "./models/listing"

export type WithTopListing<T extends unknown> = T & {
  topListing?: SearchListing
}
