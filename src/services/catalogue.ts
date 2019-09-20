import { fetchPath, Service } from "../base"

import { Make } from "../types/models"

export const fetchMakes: () => Promise<Make[]> = () => {
  return fetchPath(Service.CATALOGUE, "makes")
}
