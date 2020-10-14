import { fetchPath, RequestOptions } from "../../base"

import { Region } from "../../types/models"

export const fetchRegions = ({
  locale,
  options = {},
}: {
  locale: string
  options?: RequestOptions
}): Promise<Region[]> => {
  return fetchPath({ path: `regions?language=${locale}`, options })
}
