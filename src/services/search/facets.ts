import { postData, Service } from "../../base"

import { ListingSearchParams } from "../../types/params/listings"
import { Facets } from "../../types/facets"

export const fetchFactets = async (
  query: ListingSearchParams = {},
  fields: string[] = []
): Promise<Facets> => {
  const json = await postData(Service.SEARCH, "/listings/facets", {
    query,
    fields
  })

  return json.facets
}
