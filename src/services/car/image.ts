import { fetchPath, Service } from "../../base"

import { ImageEnrichment } from "../../types/models"

export const fetchImageEnrichment = async (
  imageId: number
): Promise<ImageEnrichment> => {
  return fetchPath(Service.CAR, `images/${imageId}/enrichment`)
}
