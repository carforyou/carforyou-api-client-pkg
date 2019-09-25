import { postData, Service } from "../../base"

import { Facets } from "../../types/facets"
import { SearchParams } from "../../types/params"

export const fetchListingCount = async (
  query: SearchParams = {},
  includeFacets = true
): Promise<{ count: number; facets?: Facets }> => {
  const json = await postData(Service.SEARCH, "listings/count", {
    query
  })

  return {
    count: json.count,
    ...(includeFacets ? { facets: json.facets } : {})
  }
}
