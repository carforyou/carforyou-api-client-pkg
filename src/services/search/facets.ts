import { postData, Service } from "../../base"

import { ListingSearchParams } from "../../types/params/listings"
import { Facets } from "../../types/facets"

import paramsToSearchRequest from "../../lib/paramsToSearchRequest"

export const fetchFacets = async (
  query: ListingSearchParams = {},
  fields: string[] = []
): Promise<Facets> => {
  const json = await postData(Service.SEARCH, "/listings/facets", {
    query: paramsToSearchRequest(query),
    fields
  })

  return json.facets
}
