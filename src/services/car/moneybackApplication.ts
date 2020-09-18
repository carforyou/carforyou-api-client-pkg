import { postData, handleValidationError, Service } from "../../base"

import { WithValidationError } from "../../types/withValidationError"
import { MoneybackApplication } from "../../types/models/applications"

export const sendMoneybackApplication = async (
  listingId: number,
  moneybackApplication: MoneybackApplication,
  options = {}
): Promise<WithValidationError<MoneybackApplication>> => {
  const { validateOnly, recaptchaToken, validateFields } = {
    validateOnly: false,
    recaptchaToken: null,
    validateFields: Object.keys(moneybackApplication),
    ...options,
  }
  const path = `listings/${listingId}/mbg-applications${
    validateOnly ? "/validate" : ""
  }`

  const headers = {
    ...(recaptchaToken ? { "Recaptcha-Token": recaptchaToken } : {}),
    "Validate-Fields": validateFields.join(","),
  }

  try {
    await postData(Service.CAR, path, moneybackApplication, headers)
    return {
      tag: "success",
      result: moneybackApplication,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
