import { fetchPath, Service } from "../../base"

import { Region } from "../../types/models"

export const fetchRegions = (lng: string): Promise<Region[]> => {
  return fetchPath({ service: Service.SEARCH, path: `regions?language=${lng}` })
}
