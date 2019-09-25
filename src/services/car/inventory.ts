import { fetchPath, Service } from "../../base"

import { Listing } from "../../types/models"

export const fetchListing = (id: number): Promise<Listing> => {
  return fetchPath(Service.CAR, `listings/${id}`)
}

export const fetchDealerMakes = async (
  dealerId: number
): Promise<Array<{ make: string; makeKey: string }>> => {
  return fetchPath(Service.CAR, `inventory/dealers/${dealerId}/makes`)
}
