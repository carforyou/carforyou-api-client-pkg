import { ListingSearchParams } from "../../types/params/listings"
import { Facets } from "../../types/facets"

import paramsToSearchRequest from "../../lib/paramsToSearchRequest"
import { ApiCallOptions, postData } from "../../base"

type Range = {
  key: string
  from: number
  to: number
}

export type Facet = {
  name: string
  ranges?: Range[]
}

export const fetchFacets = async ({
  query = {},
  facets = [],
  options = {},
}: {
  query?: ListingSearchParams
  facets?: Facet[]
  options?: ApiCallOptions
} = {}): Promise<Facets> => {
  const { facets: fetchedFacets, topFacets } = await postData({
    path: "/listings/facets",
    body: {
      query: paramsToSearchRequest(query),
      facets,
    },
    options,
  })

  return { ...fetchedFacets, topFacets }
}

export const fetchDealerListingsFacets = async ({
  dealerId,
  query = {},
  facets = [],
  options = {},
}: {
  dealerId: number
  query?: ListingSearchParams
  facets?: Facet[]
  options?: ApiCallOptions
}): Promise<Facets> => {
  const json = await postData({
    path: `/dealers/${dealerId}/listings/facets`,
    body: {
      query: paramsToSearchRequest(query),
      facets,
    },
    options: {
      ...options,
      isAuthorizedRequest: true,
    },
  })

  return json.facets
}
