import { ListingFilterParams, LocationFilter } from "../types/params/listings"

const paramsToQuery = (params: ListingFilterParams): object => {
  const { cityId, radius, ...rest } = params
  const location: LocationFilter =
    cityId && radius ? { cityId, radius } : cityId ? { cityId } : undefined

  return { ...rest, ...(location ? { location } : {}) }
}

export default paramsToQuery
