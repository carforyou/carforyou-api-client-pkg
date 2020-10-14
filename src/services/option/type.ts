import { fetchPath, RequestOptions } from "../../base"

import toQueryString from "../../lib/toQueryString"

import { Options } from "../../types/models"

export const fetchTypeOptions = async ({
  typeId,
  locale,
  productionYear,
  options = {},
}: {
  typeId: number
  locale: string
  productionYear: number
  options: RequestOptions
}): Promise<Options> => {
  return fetchPath({
    path: `types/${typeId}/options?${toQueryString({
      language: locale,
      productionYear,
    })}`,
    options,
  })
}
