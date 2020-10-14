import {
  postData,
  handleValidationError,
  RequestOptionsWithRecaptcha,
} from "../../base"

import { WithValidationError } from "../../types/withValidationError"
import { MoneybackApplication } from "../../types/models/applications"

export const sendMoneybackApplication = async ({
  listingId,
  moneybackApplication,
  options = {},
}: {
  listingId: number
  moneybackApplication: MoneybackApplication
  options: RequestOptionsWithRecaptcha & {
    validateOnly?: boolean
    validateFields?: string[]
  }
}): Promise<WithValidationError<MoneybackApplication>> => {
  const {
    validateOnly = false,
    validateFields = Object.keys(moneybackApplication),
    ...rest
  } = options
  const { headers = {}, ...otherOptions } = rest

  const path = `listings/${listingId}/mbg-applications${
    validateOnly ? "/validate" : ""
  }`

  try {
    await postData({
      path,
      body: moneybackApplication,
      options: {
        headers: {
          ...headers,
          "Validate-Fields": validateFields.join(","),
        },
        ...otherOptions,
      },
    })
    return {
      tag: "success",
      result: moneybackApplication,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
