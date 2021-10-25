import { ListingSearchParams } from "../../types/params/listings"
import { Facets } from "../../types/facets"

import paramsToSearchRequest from "../../lib/paramsToSearchRequest"
import { ApiCallOptions, postData } from "../../base"

type Range = {
  key: string
  from: number
  to: number
}

type Field = {
  name: string
  ranges?: Range[]
}

export const fetchFacets = async ({
  query = {},
  fields = [],
  options = {},
}: {
  query?: ListingSearchParams
  fields?: Field[]
  options?: ApiCallOptions
} = {}): Promise<Facets> => {
  const { facets, topFacets } = await postData({
    path: "/listings/facets",
    body: {
      query: paramsToSearchRequest(query),
      fields,
    },
    options,
  })

  return { ...facets, topFacets }
}

export const fetchDealerListingsFacets = async ({
  dealerId,
  query = {},
  fields = [],
  options = {},
}: {
  dealerId: number
  query?: ListingSearchParams
  fields?: string[]
  options?: ApiCallOptions
}): Promise<Facets> => {
  const json = await postData({
    path: `/dealers/${dealerId}/listings/facets`,
    body: {
      query: paramsToSearchRequest(query),
      fields,
    },
    options: {
      ...options,
      isAuthorizedRequest: true,
    },
  })

  return json.facets
}
