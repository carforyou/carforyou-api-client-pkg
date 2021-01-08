import { Make, Model } from "../../types/models"
import { ApiCallOptions, fetchPath } from "../../base"

export const fetchCurrentMakes = async ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<Make[]> => {
  return fetchPath({ path: "current-makes", options })
}

export const fetchCurrentModels = async ({
  makeKey,
  options = {},
}: {
  makeKey: string
  options?: ApiCallOptions
}): Promise<Model[]> => {
  return fetchPath({
    path: `current-makes/key/${makeKey}/current-models?includeBodyTypes=true`,
    options,
  })
}
