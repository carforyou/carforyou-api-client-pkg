import { putData, ApiCallOptions } from "../../base"
import { WithValidationError } from "../../types/withValidationError"

export const confirmPurchase = async ({
  key,
  confirmed,
  options = {},
}: {
  key: number
  confirmed: boolean
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  return putData({
    path: `buyer-feedback/key/${key}/add-purchase-confirmation`,
    body: {
      confirmed,
    },
    options,
  })
}
