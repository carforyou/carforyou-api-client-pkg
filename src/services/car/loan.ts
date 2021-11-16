import { WithValidationError } from "../../types/withValidationError"
import { LoanCalculation, LoanInterest } from "../../types/models/loan"
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

interface LoanData {
  amount: number
  duration: number
  price: number
}

export const calculateMonthlyRate = async ({
  loanData,
  options = {},
}: {
  loanData: LoanData
  options?: ApiCallOptions
}): Promise<LoanCalculation> => {
  return postData({
    path: "/listings/calculate-loan",
    body: loanData,
    options,
  })
}
