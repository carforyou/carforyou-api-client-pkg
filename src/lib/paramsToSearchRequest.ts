import {
  ListingFilterParams,
  ListingQueryParams,
  LocationFilter,
} from "../types/params/listings"

const paramsToSearchRequest = (
  params: ListingFilterParams | ListingQueryParams
): Record<string, unknown> => {
  const { cityId, radius, ...rest } = params
  const location: LocationFilter =
    cityId && radius ? { cityId, radius } : cityId ? { cityId } : undefined

  return { ...rest, ...(location ? { location } : {}) }
}

export default paramsToSearchRequest
