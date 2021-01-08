import { ListingSearchParams } from "../../types/params/listings"
import { Facets } from "../../types/facets"

import paramsToSearchRequest from "../../lib/paramsToSearchRequest"
import { ApiCallOptions, postData } from "../../base"

export const fetchFacets = async ({
  query = {},
  fields = [],
  options = {},
}: {
  query?: ListingSearchParams
  fields?: string[]
  options?: ApiCallOptions
} = {}): Promise<Facets> => {
  const json = await postData({
    path: "/listings/facets",
    body: {
      query: paramsToSearchRequest(query),
      fields,
    },
    options,
  })

  return json.facets
}
