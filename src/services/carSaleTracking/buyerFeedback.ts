import { ApiCallOptions, postData } from "../../base"

export const addPurchaseConfirmation = async ({
  key,
  confirmed,
  options = {},
}: {
  key: string
  confirmed: boolean
  options?: ApiCallOptions
}): Promise<void> => {
  return postData({
    path: `car-sale/buyer-feedback/key/${key}/add-purchase-confirmation`,
    body: {
      confirmed,
    },
    options,
  })
}
