import { putData, ApiCallOptions } from "../../base"

export const confirmPurchase = async ({
  key,
  confirmed,
  options = {},
}: {
  key: number
  confirmed: boolean
  options?: ApiCallOptions
}): Promise<boolean> => {
  return putData({
    path: `buyer-feedback/key/${key}/purchase-confirmation`,
    body: {
      confirmed,
    },
    options,
  })
}
