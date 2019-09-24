import { fetchPath, Service } from "../base"

import { Make, Model } from "../types/models"

export const fetchMakes = (): Promise<Make[]> => {
  return fetchPath(Service.CATALOGUE, "makes")
}

export const fetchModels = (makeKey: string): Promise<Model[]> => {
  return fetchPath(Service.CATALOGUE, `makes/key/${makeKey}/models`)
}
