import { BuyerFeedbackEntries } from "../../types/models/buyerFeedbackBatch"
import { ApiCallOptions, fetchPath } from "../../base"

export const fetchBuyerFeedbackBatch = async ({
  key,
  options = {},
}: {
  key: string
  options?: ApiCallOptions
}): Promise<BuyerFeedbackEntries> => {
  return fetchPath({
    path: `car-sale/buyer-feedback-batch/key/${key}`,
    options,
  })
}
