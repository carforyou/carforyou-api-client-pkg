import { putData, ApiCallOptions } from "../../base"
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
  return putData({
    path: `car-sale/buyer-feedback/key/${key}/add-purchase-confirmation`,
    body: {
      confirmed,
    },
    options,
  })
}
