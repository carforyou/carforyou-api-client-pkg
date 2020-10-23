import { fetchPath, ApiCallOptions } from "../../base"

import { Language } from "../../types/params"
import { Region } from "../../types/models"

export const fetchRegions = ({
  language,
  options = {},
}: {
  language: Language
  options?: ApiCallOptions
}): Promise<Region[]> => {
  return fetchPath({ path: `regions?language=${language}`, options })
}
