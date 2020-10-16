import { fetchPath, ApiCallOptions } from "../../base"

import { Region } from "../../types/models"

export const fetchRegions = ({
  locale,
  options = {},
}: {
  locale: string
  options?: ApiCallOptions
}): Promise<Region[]> => {
  return fetchPath({ path: `regions?language=${locale}`, options })
}
