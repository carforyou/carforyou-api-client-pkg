import { fetchPath, ApiCallOptions } from "../base"

import { Make, Model } from "../types/models"
import { Type } from "../types/models/type"

export const fetchMakes = ({
  options = {},
}: {
  options?: ApiCallOptions
} = {}): Promise<Make[]> => {
  return fetchPath({ path: "makes", options })
}

export const fetchModels = ({
  makeKey,
  options = {},
}: {
  makeKey: string
  options?: ApiCallOptions
}): Promise<Model[]> => {
  return fetchPath({ path: `makes/key/${makeKey}/models`, options })
}

export const fetchType = ({
  id,
  options = {},
}: {
  id: number
  options?: ApiCallOptions
}): Promise<Type> => {
  return fetchPath({ path: `types/${id}`, options })
}
