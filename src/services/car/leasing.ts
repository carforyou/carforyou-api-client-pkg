import { WithValidationError } from "../../types/withValidationError"
import { LeasingCalculation, LeasingInterest } from "../../types/models/leasing"
import { createApiPathWithValidate } from "../../lib/path"
import { ApiCallOptions, handleValidationError, postData } from "../../base"

export const createLeasingInterest = async ({
  listingId,
  leasingInterest,
  options = {},
}: {
  listingId: number
  leasingInterest: LeasingInterest
  options?: ApiCallOptions & { validateOnly?: boolean }
}): Promise<WithValidationError<LeasingInterest>> => {
  const { validateOnly = false } = options

  const path = createApiPathWithValidate(
    `/listings/${listingId}/leasing-interests`,
    validateOnly
  )

  try {
    const response = await postData({
      path: path,
      body: leasingInterest,
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

interface LeasingData {
  downPayment: number
  duration: number
  estimatedKmPerYear: number
  firstRegistrationDate: string
  price: number
  residualValue: number
}

export const calculateLeasing = async ({
  leasingData,
  options = {},
}: {
  leasingData: LeasingData
  options?: ApiCallOptions
}): Promise<LeasingCalculation> => {
  return postData({
    path: "/listings/calculate-leasing",
    body: leasingData,
    options,
  })
}
