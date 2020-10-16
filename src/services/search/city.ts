import { fetchPath, ApiCallOptions } from "../../base"

import { Paginated } from "../../types/pagination"
import { City } from "../../types/models"

export const fetchCity = ({
  id,
  locale,
  options = {},
}: {
  id: number
  locale: string
  options?: ApiCallOptions
}): Promise<City> => {
  return fetchPath({ path: `cities/${id}?language=${locale}`, options })
}

export const fetchCitySuggestions = async ({
  locale,
  query,
  options = {},
}: {
  locale: string
  query: string
  options?: ApiCallOptions
}): Promise<Paginated<City>> => {
  return fetchPath({
    path: `cities/suggestions?language=${locale}&q=${query}`,
    options,
  })
}
