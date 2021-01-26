import { WithValidationError } from "../../types/withValidationError"
import { MoneybackApplication } from "../../types/models/applications"
import { ApiCallOptions, ignoreServerSideErrors, postData } from "../../base"
import { createApiPathWithValidate } from "../../lib/path"

export const sendMoneybackApplication = async ({
  listingId,
  moneybackApplication,
  options = {},
}: {
  listingId: number
  moneybackApplication: MoneybackApplication
  options?: ApiCallOptions & {
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

  const path = createApiPathWithValidate(
    `listings/${listingId}/mbg-applications`,
    validateOnly
  )

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
    return ignoreServerSideErrors({
      error,
      errorHandlerOptions: { swallowErrors: true },
      returnValue: moneybackApplication,
    })
  }
}
