import {
  fetchPath,
  Service,
  postData,
  putData,
  handleValidationError,
  RequestOptions,
} from "../../base"

import { ImageEnrichment, PresignedUrl } from "../../types/models"
import { Listing, DealerListingImages } from "../../types/models/listing"
import { WithValidationError } from "../../types/withValidationError"

export const fetchImageEnrichment = async (
  imageId: number
): Promise<ImageEnrichment> => {
  return fetchPath({
    service: Service.CAR,
    path: `images/${imageId}/enrichment`,
  })
}

export const generatePresignedImageUrl = (
  imageData: {
    key: string
    title: string
    contentType: string
  },
  options: RequestOptions = {}
): Promise<PresignedUrl> => {
  return postData({
    service: Service.CAR,
    path: "images/generate-presigned-url",
    body: imageData,
    options: { isAuthorizedRequest: true, ...options },
  })
}

export const fetchDealerListingImages = async (
  dealerId: number,
  listingId: number,
  options: RequestOptions = {}
): Promise<DealerListingImages> => {
  return fetchPath({
    service: Service.CAR,
    path: `dealers/${dealerId}/listings/${listingId}/images`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}

export const saveDealerListingImages = async (
  {
    dealerId,
    listing,
  }: {
    dealerId: number
    listing: Listing
  },
  options: RequestOptions = {}
): Promise<WithValidationError<Listing>> => {
  try {
    await putData({
      service: Service.CAR,
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
