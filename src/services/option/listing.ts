import { fetchPath, Service } from "../../base"

import { ListingOptions } from "../../types/models"

export const fetchListingOptions = async (
  id: number
): Promise<ListingOptions> => {
  return fetchPath(Service.OPTION, `listings/${id}/options`)
}
