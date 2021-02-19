import { WithValidationError } from "../types/withValidationError"
import { ApiCallOptions, handleValidationError, postData } from "../base"

export const sendSupportCase = async ({
  dealerId,
  message,
  subject,
  options = {},
}: {
  dealerId: number
  message: string
  subject: string
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    const result = await postData({
      path: `dealers/${dealerId}/support-cases`,
      body: { details: message, subject },
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
