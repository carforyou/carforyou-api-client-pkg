import { fetchPath, Service } from "../../base"

import { Options } from "../../types/models"

export const fetchListingOptions = async (
  id: number
): Promise<Options> => {
  return fetchPath(Service.OPTION, `listings/${id}/options`)
}
