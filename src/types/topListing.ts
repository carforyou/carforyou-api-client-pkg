import { SearchListing } from "./models/listing"

export type WithTopListing<T extends {}> = T & {
  topListing: SearchListing
}
