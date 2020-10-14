import { fetchPath, RequestOptions } from "../base"

import { Make, Model } from "../types/models"
import { Type } from "../types/models/type"

export const fetchMakes = ({
  options = {},
}: {
  options?: RequestOptions
} = {}): Promise<Make[]> => {
  return fetchPath({ path: "makes", options })
}

export const fetchModels = ({
  makeKey,
  options = {},
}: {
  makeKey: string
  options?: RequestOptions
}): Promise<Model[]> => {
  return fetchPath({ path: `makes/key/${makeKey}/models`, options })
}

export const fetchType = ({
  id,
  options = {},
}: {
  id: number
  options?: RequestOptions
}): Promise<Type> => {
  return fetchPath({ path: `types/${id}`, options })
}
