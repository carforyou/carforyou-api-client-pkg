import { WithValidationError } from "../../types/withValidationError"
import {
  DealerDefaultListing,
  DealerDefaultAdditionalServices,
  DealerDefaultWarranty,
} from "../../types/models/listing"
import {
  ApiCallOptions,
  fetchPath,
  handleValidationError,
  putData,
} from "../../base"

export const fetchDealerDefaultListing = async ({
  dealerId,
  options = {},
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<DealerDefaultListing> => {
  return fetchPath({
    path: `dealers/${dealerId}/default-listing`,
    options: { isAuthorizedRequest: true, ...options },
  })
}

export const saveDealerDefaultAdditionalServices = async ({
  dealerId,
  additionalServices,
  options = {},
}: {
  dealerId: number
  additionalServices: DealerDefaultAdditionalServices
  options?: ApiCallOptions
}): Promise<WithValidationError<DealerDefaultAdditionalServices>> => {
  try {
    const result = await putData({
      path: `dealers/${dealerId}/default-listing/additional-services`,
      body: { additionalServices },
      options: { isAuthorizedRequest: true, ...options },
    })
    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const saveDealerDefaultDescription = async ({
  dealerId,
  description,
  options = {},
}: {
  dealerId: number
  description: string
  options?: ApiCallOptions
}): Promise<WithValidationError<{ description: string }>> => {
  try {
    const result = await putData({
      path: `dealers/${dealerId}/default-listing/description`,
      body: { description },
      options: { isAuthorizedRequest: true, ...options },
    })
    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const saveDealerDefaultWarranty = async ({
  dealerId,
  warranty,
  options = {},
}: {
  dealerId: number
  warranty: DealerDefaultWarranty
  options?: ApiCallOptions
}): Promise<WithValidationError<DealerDefaultWarranty>> => {
  try {
    const result = await putData({
      path: `dealers/${dealerId}/default-listing/warranty`,
      body: { warranty },
      options: { isAuthorizedRequest: true, ...options },
    })
    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
