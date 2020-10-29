import { postData, ApiCallOptions } from "../../base"
import { WithValidationError } from "../../types/withValidationError"

export const addPurchaseConfirmation = async ({
  key,
  confirmed,
  options = {},
}: {
  key: string
  confirmed: boolean
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  return postData({
    path: `car-sale/buyer-feedback/key/${key}/add-purchase-confirmation`,
    body: {
      confirmed,
    },
    options,
  })
}
