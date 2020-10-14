import { fetchPath, RequestOptions } from "../../base"

import { Make, Model } from "../../types/models"

export const fetchCurrentMakes = async ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<Make[]> => {
  return fetchPath({ path: "current-makes", options })
}

export const fetchCurrentModels = async ({
  makeKey,
  options = {},
}: {
  makeKey: string
  options?: RequestOptions
}): Promise<Model[]> => {
  return fetchPath({
    path: `current-makes/key/${makeKey}/current-models?includeBodyTypes=true`,
    options,
  })
}
