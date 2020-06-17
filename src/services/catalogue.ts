import { fetchPath, Service } from "../base"

import { Make, Model } from "../types/models"
import { Type } from "../types/models/type"

export const fetchMakes = (): Promise<Make[]> => {
  return fetchPath(Service.CATALOGUE, "makes")
}

export const fetchModels = (makeKey: string): Promise<Model[]> => {
  return fetchPath(Service.CATALOGUE, `makes/key/${makeKey}/models`)
}

export const fetchType = (id: number): Promise<Type> => {
  return fetchPath(Service.CATALOGUE, `types/${id}`)
}
