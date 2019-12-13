import { fetchPath, Service } from "../../base"

import { Region } from "../../types/models"

export const fetchRegions = (lng: string): Promise<Region[]> => {
  return fetchPath(Service.SEARCH, `regions?language=${lng}`)
}
