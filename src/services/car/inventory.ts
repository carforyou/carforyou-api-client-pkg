import { fetchPath, Service } from "../../base"

import { Listing } from "../../types/models"

export const fetchListing = (id: number): Promise<Listing> => {
  return fetchPath(Service.CAR, `listings/${id}`)
}
