import { Type } from "../types/models/type"
import { Make, Model } from "../types/models"
import { ApiCallOptions, fetchPath } from "../base"

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
