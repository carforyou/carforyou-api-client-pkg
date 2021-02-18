import { WithValidationError } from "../../types/withValidationError"
import { CallTrackingEntry } from "../../types/models/tracking"
import { ApiCallOptions } from "../../base"

import { postTrackingData } from "."

export const postCallTrackingEntry = async ({
  listingId,
  body,
  options = {},
}: {
  listingId: number
  body: CallTrackingEntry
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<WithValidationError<CallTrackingEntry>> => {
  return postTrackingData({
    pathSegment: "call-tracking-entries",
    listingId,
    body,
    options,
  })
}
