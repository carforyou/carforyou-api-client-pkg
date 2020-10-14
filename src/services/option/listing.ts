import {
  fetchPath,
  handleValidationError,
  putData,
  RequestOptions,
} from "../../base"
import { withTokenRefresh } from "../../tokenRefresh"

import { Options } from "../../types/models"
import { Listing } from "../../types/models/listing"
import { WithValidationError } from "../../types/withValidationError"

export const fetchListingOptions = async ({
  listingId,
  locale,
  options = {},
}: {
  listingId: number
  locale: string
  options?: RequestOptions
}): Promise<Options> => {
  return fetchPath({
    path: `listings/${listingId}/options?language=${locale}`,
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
  options?: RequestOptions
}): Promise<Options> => {
  return withTokenRefresh(() =>
    fetchPath({
      path: `dealers/${dealerId}/listings/${listingId}/options`,
      options,
    })
  )
}

export const saveDealerListingOptions = async ({
  dealerId,
  listing,
  options = {},
}: {
  dealerId: number
  listing: Listing
  options?: RequestOptions
}): Promise<WithValidationError<Listing>> => {
  const { standardOptions, additionalOptions, id } = listing

  return withTokenRefresh(async () => {
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
