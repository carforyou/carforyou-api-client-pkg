import { fetchPath, Service } from "../../base"

import { Paginated } from "../../types/pagination"
import { Listing, SearchListing } from "../../types/models/listing"

import toQueryString from "../../lib/toQueryString"

export const fetchListing = (id: number): Promise<Listing> => {
  return fetchPath(Service.CAR, `listings/${id}`)
}

export const fetchDealerMakes = async (
  dealerId: number
): Promise<Array<{ make: string; makeKey: string }>> => {
  return fetchPath(Service.CAR, `inventory/dealers/${dealerId}/makes`)
}

export const fetchMoneybackListings = (
  dealerId: number,
  query?: {
    makeKey: string
    size: number
    page: number
  }
): Promise<Paginated<SearchListing>> => {
  return fetchPath(
    Service.CAR,
    `dealers/${dealerId}/mbg-listings?${toQueryString(query)}`
  )
}
