import { WithValidationError } from "../types/withValidationError"
import { ApiCallOptions, deletePath, handleValidationError } from "../base"

export const deleteUser = async ({
  options = {},
}: {
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await deletePath({
      path: `users/me`,
      options: { isAuthorizedRequest: true, ...options },
    })

    return {
      tag: "success",
      result: {},
    }
  } catch (error) {
    return handleValidationError(error, { swallowErrors: true })
  }
}
