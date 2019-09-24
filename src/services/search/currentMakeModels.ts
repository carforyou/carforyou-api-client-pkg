import { fetchPath, Service } from "../../base"

import { Make, Model } from "../../types/models"

export const fetchCurrentMakes = async (): Promise<Make[]> => {
  return fetchPath(Service.SEARCH, "current-makes")
}

export const fetchCurrentModels = async (makeKey: string): Promise<Model[]> => {
  return fetchPath(
    Service.SEARCH,
    `current-makes/key/${makeKey}/current-models?includeBodyTypes=true`
  )
}
