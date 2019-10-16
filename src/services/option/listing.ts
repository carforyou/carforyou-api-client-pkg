import { fetchPath, Service, handleValidationError, putData } from "../../base"
import { withTokenRefresh } from "../../tokenRefresh"

import { Options } from "../../types/models"
import { Listing } from "../../types/models/listing"
import { WithValidationError } from "../../types/withValidationError"

export const fetchListingOptions = async (id: number): Promise<Options> => {
  return fetchPath(Service.OPTION, `listings/${id}/options`)
}

export const fetchDealerListingOptions = async ({
  dealerId,
  listingId
}: {
  dealerId: number
  listingId: number
}): Promise<Options> => {
  return withTokenRefresh(() =>
    fetchPath(
      Service.OPTION,
      `dealers/${dealerId}/listings/${listingId}/options`
    )
  )
}

export const saveDealerListingOptions = async ({
  dealerId,
  listing
}: {
  dealerId: number
  listing: Listing
}): Promise<WithValidationError<Listing>> => {
  const { standardOptions, additionalOptions, id } = listing

  return withTokenRefresh(async () => {
    try {
      await putData(
        Service.OPTION,
        `dealers/${dealerId}/listings/${id}/options`,
        {
          standardOptions: standardOptions.map(optionId => ({
            id: optionId
          })),
          additionalOptions: additionalOptions.map(optionId => ({
            id: optionId
          }))
        }
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
