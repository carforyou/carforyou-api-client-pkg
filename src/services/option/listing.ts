import {
  fetchPath,
  handleValidationError,
  putData,
  ApiCallOptions,
} from "../../base"

import { Language } from "../../types/params"
import { Options } from "../../types/models"
import { Listing } from "../../types/models/listing"
import { WithValidationError } from "../../types/withValidationError"

export const fetchListingOptions = async ({
  listingId,
  language,
  options = {},
}: {
  listingId: number
  language: Language
  options?: ApiCallOptions
}): Promise<Options> => {
  return fetchPath({
    path: `listings/${listingId}/options?language=${language}`,
    options,
  })
}

export const fetchDealerListingOptions = async ({
  dealerId,
  listingId,
  options = {},
}: {
  dealerId: number
  listingId: number
  options?: ApiCallOptions
}): Promise<Options> => {
  return fetchPath({
    path: `dealers/${dealerId}/listings/${listingId}/options`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
}

export const saveDealerListingOptions = async ({
  dealerId,
  listing,
  options = {},
}: {
  dealerId: number
  listing: Listing
  options?: ApiCallOptions
}): Promise<WithValidationError<Listing>> => {
  const { standardOptions, additionalOptions, id } = listing

  try {
    await putData({
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
