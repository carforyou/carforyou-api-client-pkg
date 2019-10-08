import {
  fetchPath,
  Service,
  postData,
  putData,
  handleValidationError
} from "../../base"
import { withTokenRefresh } from "../../tokenRefresh"

import { ImageEnrichment, PresignedUrl } from "../../types/models"
import { Listing } from "../../types/models/listing"
import { WithValidationError } from "../../types/withValidationError"

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

export const saveDealerListingImages = ({
  dealerId,
  listing
}: {
  dealerId: number
  listing: Listing
}): Promise<WithValidationError<Listing>> => {
  return withTokenRefresh(async () => {
    try {
      await putData(
        Service.CAR,
        `dealers/${dealerId}/listings/${listing.id}/images`,
        { images: listing.images }
      )
    } catch (error) {
      return handleValidationError(error)
    }

    return {
      tag: "success",
      result: listing
    }
  })
}
