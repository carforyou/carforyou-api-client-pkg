import { fetchPath, Service } from "../../base"

import { Paginated } from "../../types/pagination"
import { City } from "../../types/models"

export const fetchCity = (id: number, lng: string): Promise<City> => {
  return fetchPath({
    service: Service.SEARCH,
    path: `cities/${id}?language=${lng}`,
  })
}

export const fetchCitySuggestions = async (
  lng: string,
  query: string
): Promise<Paginated<City>> => {
  return fetchPath({
    service: Service.SEARCH,
    path: `cities/suggestions?language=${lng}&q=${query}`,
  })
}
