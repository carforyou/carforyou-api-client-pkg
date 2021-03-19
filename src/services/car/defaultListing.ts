import { WithValidationError } from "../../types/withValidationError"
import {
  DealerDefaultListingAdditionalServices,
  DealerDefaultListingData,
  DealerDefaultListingDescription,
  DealerDefaultListingGeneralExternalNote,
  DealerDefaultListingWarranty,
} from "../../types/models/dealerDefaultListing"
import {
  ApiCallOptions,
  fetchPath,
  handleValidationError,
  putData,
} from "../../base"

export const fetchDealerDefaultListingData = async ({
  dealerId,
  options = {},
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<DealerDefaultListingData> => {
  return fetchPath({
    path: `dealers/${dealerId}/default-listing`,
    options: { isAuthorizedRequest: true, ...options },
  })
}

export const saveDealerDefaultListingAdditionalServices = async ({
  dealerId,
  additionalServices,
  options = {},
}: {
  dealerId: number
  additionalServices: DealerDefaultListingAdditionalServices
  options?: ApiCallOptions
}): Promise<WithValidationError<DealerDefaultListingAdditionalServices>> => {
  try {
    const result = await putData({
      path: `dealers/${dealerId}/default-listing/additional-services`,
      body: additionalServices,
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

export const saveDealerDefaultListingDescription = async ({
  dealerId,
  description,
  options = {},
}: {
  dealerId: number
  description: DealerDefaultListingDescription
  options?: ApiCallOptions
}): Promise<WithValidationError<DealerDefaultListingDescription>> => {
  try {
    const result = await putData({
      path: `dealers/${dealerId}/default-listing/description`,
      body: description,
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

export const saveDealerDefaultListingWarranty = async ({
  dealerId,
  warranty,
  options = {},
}: {
  dealerId: number
  warranty: DealerDefaultListingWarranty
  options?: ApiCallOptions
}): Promise<WithValidationError<DealerDefaultListingWarranty>> => {
  try {
    const result = await putData({
      path: `dealers/${dealerId}/default-listing/warranty`,
      body: warranty,
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

export const saveDealerDefaultListingGeneralExternalNote = async ({
  dealerId,
  generalExternalNote,
  options = {},
}: {
  dealerId: number
  generalExternalNote: DealerDefaultListingGeneralExternalNote
  options?: ApiCallOptions
}): Promise<WithValidationError<DealerDefaultListingGeneralExternalNote>> => {
  try {
    const result = await putData({
      path: `dealers/${dealerId}/default-listing/general-external-note`,
      body: generalExternalNote,
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
