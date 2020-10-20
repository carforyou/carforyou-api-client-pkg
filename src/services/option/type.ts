import { fetchPath, ApiCallOptions } from "../../base"

import toQueryString from "../../lib/toQueryString"

import { Language } from "../../types/params"
import { Options } from "../../types/models"

export const fetchTypeOptions = async ({
  typeId,
  query,
  options = {},
}: {
  typeId: number
  query: {
    language: Language
    productionYear: number
  }
  options?: ApiCallOptions
}): Promise<Options> => {
  return fetchPath({
    path: `types/${typeId}/options?${toQueryString(query)}`,
    options,
  })
}
