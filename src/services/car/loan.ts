import { WithValidationError } from "../../types/withValidationError"
import { LoanInterest } from "../../types/models/loan"
import { createApiPathWithValidate } from "../../lib/path"
import { ApiCallOptions, handleValidationError, postData } from "../../base"

export const createLoanInterest = async ({
  listingId,
  loanInterest,
  options = {},
}: {
  listingId: number
  loanInterest: LoanInterest
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<WithValidationError<LoanInterest>> => {
  const { validateOnly = false } = options

  const path = createApiPathWithValidate(
    `/listings/${listingId}/loan-interests`,
    validateOnly
  )

  try {
    const response = await postData({
      path: path,
      body: loanInterest,
      options,
    })
    return {
      tag: "success",
      result: response,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
