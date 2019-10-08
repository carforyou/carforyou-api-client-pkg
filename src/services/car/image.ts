import { fetchPath, Service, postData } from "../../base"
import { withTokenRefresh } from "../../tokenRefresh"

import { ImageEnrichment, PresignedUrl } from "../../types/models"

export const fetchImageEnrichment = async (
  imageId: number
): Promise<ImageEnrichment> => {
  return fetchPath(Service.CAR, `images/${imageId}/enrichment`)
}

export const generatePresignedImageUrl = (imageData: {
  key: string
  title: string
  contentType: string
}): Promise<PresignedUrl> => {
  return withTokenRefresh(() =>
    postData(Service.CAR, "images/generate-presigned-url", imageData)
  )
}
