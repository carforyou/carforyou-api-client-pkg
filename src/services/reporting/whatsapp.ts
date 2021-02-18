import { WithValidationError } from "../../types/withValidationError"
import { WhatsappEntry } from "../../types/models/tracking"
import { ApiCallOptions } from "../../base"

import { postTrackingData } from "."

export const postWhatsappTrackingEntry = async ({
  listingId,
  whatsappEntry,
  options = {},
}: {
  listingId: number
  whatsappEntry: WhatsappEntry
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<WithValidationError<WhatsappEntry>> => {
  return postTrackingData({
    pathSegment: "whats-app-tracking-entries",
    listingId,
    body: whatsappEntry,
    options,
  })
}
