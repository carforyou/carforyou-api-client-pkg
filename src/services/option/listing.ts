import { WithValidationError } from "../../types/withValidationError"
import { Language } from "../../types/params"
import { Listing } from "../../types/models/listing"
import { BulkFetchResponse, Options } from "../../types/models"
import {
  ApiCallOptions,
  fetchPath,
  handleValidationError,
  postData,
  putData,
} from "../../base"

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
    path: `listings/${listingId}/equipment?language=${language}`,
    options,
  })
}

export const bulkFetchListingOptions = async ({
  listingIds,
  language,
  options = {},
}: {
  listingIds: number[]
  language: Language
  options?: ApiCallOptions
}): Promise<BulkFetchResponse<Options>[]> => {
  return postData({
    path: `listings/equipment/bulk-get?language=${language}`,
    body: { elements: listingIds },
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
    path: `dealers/${dealerId}/listings/${listingId}/equipment`,
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
  const { standard, optional, id } = listing

  try {
    await putData({
      path: `dealers/${dealerId}/listings/${id}/equipment`,
      body: {
        standard,
        optional,
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
