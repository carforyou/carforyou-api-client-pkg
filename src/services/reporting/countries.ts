import { Language } from "../../types/params"
import { Country } from "../../types/models"
import { ApiCallOptions, fetchPath } from "../../base"

export const fetchCountries = async ({
  language,
  options = {},
}: {
  language: Language
  options?: ApiCallOptions
}): Promise<Country[]> => {
  return fetchPath({
    path: `countries?language=${language}`,
    options: options,
  })
}
