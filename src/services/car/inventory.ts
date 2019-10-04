import { fetchPath, Service } from "../../base"
import { withTokenRefresh } from "../../tokenRefresh"

import { Paginated } from "../../types/pagination"
import { Listing, SearchListing } from "../../types/models/listing"
import { DealerListingQueryParams } from "../../types/params/listings"

import toQueryString from "../../lib/toQueryString"

export const fetchListing = (id: number): Promise<Listing> => {
  return fetchPath(Service.CAR, `listings/${id}`)
}

export const fetchDealerMakes = async (
  dealerId: number
): Promise<Array<{ make: string; makeKey: string }>> => {
  return fetchPath(Service.CAR, `inventory/dealers/${dealerId}/makes`)
}

export const fetchDealerListingsCount = async (
  dealerId: number,
  query: DealerListingQueryParams
): Promise<number> => {
  return withTokenRefresh(async () => {
    const { count } = await fetchPath(
      Service.CAR,
      `dealers/${dealerId}/listings/count${
        Object.keys(query).length > 0 ? "?" + toQueryString(query) : null
      }`
    )
    return count
  })
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
