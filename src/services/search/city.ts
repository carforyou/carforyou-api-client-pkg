import { fetchPath, Service } from "../../base"

import { Paginated } from "../../types/pagination"
import { CitySuggestion } from "../../types/models"

export const fetchCitySuggestions = async (
  lng: string,
  query: string
): Promise<Paginated<CitySuggestion>> => {
  return fetchPath(
    Service.SEARCH,
    `cities/suggestions?language=${lng}&q=${query}`
  )
}
