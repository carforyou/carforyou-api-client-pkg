import { Make, MakeWithModels, Model } from "../../types/models"
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

export const fetchMakesSuggestions = async ({
  query,
  options = {},
}: {
  query: string
  options?: ApiCallOptions
}): Promise<MakeWithModels[]> =>
  await fetchPath({
    path: `current-makes/suggestions?q=${query}`,
    options,
  })
