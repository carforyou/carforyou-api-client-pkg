import { ApiCallOptions, postData } from "../../base"

export const postBulkDealerFeedback = async ({
  dealerId,
  elements,
  options = {},
}: {
  dealerId: number
  elements: {
    listingId: number
    purchaseConfirmed: boolean
  }[]
  options?: ApiCallOptions
}): Promise<void> => {
  return postData({
    path: `dealers/${dealerId}/listings/car-sale/dealer-feedback`,
    body: {
      elements,
    },
    options,
  })
}
