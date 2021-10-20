import { WithValidationError } from "../../types/withValidationError"
import { DealerListingImages, Listing } from "../../types/models/listing"
import { PresignedUrl } from "../../types/models"
import {
  ApiCallOptions,
  fetchPath,
  handleValidationError,
  postData,
  putData,
} from "../../base"

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
  return postData({
    path: "images/generate-presigned-url",
    body: imageData,
    options: { isAuthorizedRequest: true, ...options },
  })
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
    options: { isAuthorizedRequest: true, ...options },
  })
}

export const saveDealerListingImages = async ({
  dealerId,
  listing,
  options = {},
}: {
  dealerId: number
  listing: Listing
  options?: ApiCallOptions
}): Promise<WithValidationError<Listing>> => {
  try {
    await putData({
      path: `dealers/${dealerId}/listings/${listing.id}/images`,
      body: { images: listing.images },
      options: { isAuthorizedRequest: true, ...options },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: listing,
  }
}
