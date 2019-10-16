import { Service, fetchPath } from "../../base"

import toQueryString from "../../lib/toQueryString"

import { Options } from "../../types/models"

export const fetchTypeOptions = async (
  typeId: number,
  query: {
    language: string
    productionYear: number
  }
): Promise<Options> => {
  return fetchPath(
    Service.OPTION,
    `types/${typeId}/options?${toQueryString(query)}`
  )
}
