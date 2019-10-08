import { fetchPath, Service } from "../../base"
import { withTokenRefresh } from "../../tokenRefresh"

import { Options } from "../../types/models"

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
