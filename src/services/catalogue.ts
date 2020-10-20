import { fetchPath, Service } from "../base"

import { Make, Model } from "../types/models"
import { Type } from "../types/models/type"

export const fetchMakes = (): Promise<Make[]> => {
  return fetchPath({ service: Service.CATALOGUE, path: "makes" })
}

export const fetchModels = (makeKey: string): Promise<Model[]> => {
  return fetchPath({
    service: Service.CATALOGUE,
    path: `makes/key/${makeKey}/models`,
  })
}

export const fetchType = (id: number): Promise<Type> => {
  return fetchPath({ service: Service.CATALOGUE, path: `types/${id}` })
}
