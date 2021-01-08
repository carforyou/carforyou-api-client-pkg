import { Language } from "../../types/params"
import { Options } from "../../types/models"
import toQueryString from "../../lib/toQueryString"
import { ApiCallOptions, fetchPath } from "../../base"

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
