import {
  fetchPath,
  Service,
  handleValidationError,
  putData,
  RequestOptions,
} from "../../base"

import { Options } from "../../types/models"
import { Listing } from "../../types/models/listing"
import { WithValidationError } from "../../types/withValidationError"

export const fetchListingOptions = async (
  id: number,
  lng: string
): Promise<Options> => {
  return fetchPath({
    service: Service.OPTION,
    path: `listings/${id}/options?language=${lng}`,
  })
}

export const fetchDealerListingOptions = async (
  {
    dealerId,
    listingId,
  }: {
    dealerId: number
    listingId: number
  },
  options: RequestOptions = {}
): Promise<Options> => {
  return fetchPath({
    service: Service.OPTION,
    path: `dealers/${dealerId}/listings/${listingId}/options`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}

export const saveDealerListingOptions = async (
  {
    dealerId,
    listing,
  }: {
    dealerId: number
    listing: Listing
  },
  options: RequestOptions = {}
): Promise<WithValidationError<Listing>> => {
  const { standardOptions, additionalOptions, id } = listing

  try {
    await putData({
      service: Service.OPTION,
      path: `dealers/${dealerId}/listings/${id}/options`,
      body: {
        standardOptions: standardOptions.map((optionId) => ({
          id: optionId,
        })),
        additionalOptions: additionalOptions.map((optionId) => ({
          id: optionId,
        })),
      },
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: listing,
  }
}
