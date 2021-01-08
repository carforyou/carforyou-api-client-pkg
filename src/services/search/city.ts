import { Language } from "../../types/params"
import { Paginated } from "../../types/pagination"
import { City } from "../../types/models"
import { ApiCallOptions, fetchPath } from "../../base"

export const fetchCity = ({
  id,
  language,
  options = {},
}: {
  id: number
  language: Language
  options?: ApiCallOptions
}): Promise<City> => {
  return fetchPath({ path: `cities/${id}?language=${language}`, options })
}

export const fetchCitySuggestions = async ({
  language,
  query,
  options = {},
}: {
  language: Language
  query: string
  options?: ApiCallOptions
}): Promise<Paginated<City>> => {
  return fetchPath({
    path: `cities/suggestions?language=${language}&q=${query}`,
    options,
  })
}
