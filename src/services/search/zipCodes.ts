import { fetchPath, Service } from "../../base"

import { ZipCode } from "../../types/models"

export const fetchZipCodes = (): Promise<ZipCode[]> => {
  return fetchPath(Service.SEARCH, "/zipcodes")
}
