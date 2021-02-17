import { WithValidationError } from "../types/withValidationError"
import { ApiCallOptions, handleValidationError, postData } from "../base"

export const supportCases = async ({
  dealerId,
  details,
  subject,
  options = {},
}: {
  dealerId: number
  details: string
  subject: string
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    const result = await postData({
      path: `dealers/${dealerId}/support-cases`,
      body: { details, subject },
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })

    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
