import {
  fetchPath,
  postData,
  putData,
  handleValidationError,
  ApiCallOptions,
} from "../../base"
import { withTokenRefresh } from "../../tokenRefresh"

import { ImageEnrichment, PresignedUrl } from "../../types/models"
import { Listing, DealerListingImages } from "../../types/models/listing"
import { WithValidationError } from "../../types/withValidationError"

export const fetchImageEnrichment = async ({
  imageId,
  options = {},
}: {
  imageId: number
  options?: ApiCallOptions
}): Promise<ImageEnrichment> => {
  return fetchPath({ path: `images/${imageId}/enrichment`, options })
}

export const generatePresignedImageUrl = ({
  imageData,
  options = {},
}: {
  imageData: {
    key: string
    title: string
    contentType: string
  }
  options?: ApiCallOptions
}): Promise<PresignedUrl> => {
  return withTokenRefresh(() =>
    postData({
      path: "images/generate-presigned-url",
      body: imageData,
      options,
    })
  )
}

export const fetchDealerListingImages = async ({
  dealerId,
  listingId,
  options = {},
}: {
  dealerId: number
  listingId: number
  options?: ApiCallOptions
}): Promise<DealerListingImages> => {
  return fetchPath({
    path: `dealers/${dealerId}/listings/${listingId}/images`,
    options,
  })
}

export const saveDealerListingImages = ({
  dealerId,
  listing,
  options = {},
}: {
  dealerId: number
  listing: Listing
  options?: ApiCallOptions
}): Promise<WithValidationError<Listing>> => {
  return withTokenRefresh(async () => {
    try {
      await putData({
        path: `dealers/${dealerId}/listings/${listing.id}/images`,
        body: { images: listing.images },
        options,
      })
    } catch (error) {
      return handleValidationError(error)
    }

    return {
      tag: "success",
      result: listing,
    }
  })
}
