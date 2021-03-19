import { ApiCallOptions, postData } from "../../base"

export const postDealerFeedback = async ({
  dealerId,
  listingId,
  purchaseConfirmed,
  options = {},
}: {
  dealerId: number
  listingId: number
  purchaseConfirmed: boolean
  options?: ApiCallOptions
}): Promise<void> => {
  return postData({
    path: `dealers/${dealerId}/listings/${listingId}/car-sale/dealer-feedback`,
    body: {
      purchaseConfirmed,
    },
    options,
  })
}
