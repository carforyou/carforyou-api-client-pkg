import { WithValidationError } from "../../types/withValidationError"
import { Paginated } from "../../types/pagination"
import { Listing } from "../../types/models/listing"
import toQueryString from "../../lib/toQueryString"
import { decodeDate, encodeDate } from "../../lib/dateEncoding"
import {
  ApiCallOptions,
  fetchPath,
  handleValidationError,
  postData,
  putData,
} from "../../base"

const sanitizeListing = (json): Listing => {
  const { firstRegistrationDate, lastInspectionDate, ...rest } = json

  return {
    ...rest,
    firstRegistrationDate: decodeDate(firstRegistrationDate),
    lastInspectionDate: decodeDate(lastInspectionDate),
    additionalOptions: [],
    standardOptions: [],
  }
}

export const fetchListing = async ({
  id,
  options = {},
}: {
  id: number
  options?: ApiCallOptions
}): Promise<Listing> => {
  const listing = await fetchPath({ path: `listings/${id}`, options })

  return sanitizeListing(listing)
}

export const fetchDealerMakes = async ({
  dealerId,
  options = {},
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<Array<{ make: string; makeKey: string }>> => {
  return fetchPath({ path: `inventory/dealers/${dealerId}/makes`, options })
}

export const fetchDealerModels = async ({
  dealerId,
  makeKey,
  options = {},
}: {
  dealerId: number
  makeKey: string
  options?: ApiCallOptions
}): Promise<Array<{ model: string; modelKey: string }>> => {
  return fetchPath({
    path: `dealers/${dealerId}/models?makeKey=${makeKey}`,
    options,
  })
}

export const fetchDealerOrAssociationMakes = async ({
  dealerId,
  association,
  options = {},
}: {
  dealerId?: number
  association?: string
  options?: ApiCallOptions
}): Promise<Paginated<{ make: string; makeKey: string }>> => {
  return fetchPath({
    path: `dealers/makes?${toQueryString({ dealerId, association })}`,
    options,
  })
}

export const fetchDealerOrAssociationModels = async ({
  dealerId,
  association,
  makeKey,
  options = {},
}: {
  dealerId?: number
  association?: string
  makeKey: string
  options?: ApiCallOptions
}): Promise<Paginated<{ model: string; modelKey: string }>> => {
  return fetchPath({
    path: `dealers/models?${toQueryString({ dealerId, association, makeKey })}`,
    options,
  })
}

export const fetchDealerListing = async ({
  dealerId,
  listingId,
  options = {},
}: {
  dealerId: number
  listingId: number
  options?: ApiCallOptions
}): Promise<Listing> => {
  const listing = await fetchPath({
    path: `dealers/${dealerId}/listings/${listingId}`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

  return sanitizeListing(listing)
}

export const prepareListingData = (listing) => {
  const { id, firstRegistrationDate, lastInspectionDate, ...rest } = listing

  return {
    ...rest,
    firstRegistrationDate: encodeDate(firstRegistrationDate),
    lastInspectionDate: encodeDate(lastInspectionDate),
  }
}

export enum ListingValidationEndpoint {
  draft = "draft",
  publish = "publish",
}

const validationPathForListing = (dealerId, listing, validationEndpoint) => {
  const { id } = listing

  switch (validationEndpoint) {
    case ListingValidationEndpoint.draft:
      return `dealers/${dealerId}/listings/validate`
    case ListingValidationEndpoint.publish:
      if (id) {
        return `dealers/${dealerId}/listings/${id}/publish/validate`
      } else {
        throw new Error("Only saved listings can be validated for publishing")
      }
    default:
      throw new Error(`Unknown validation endpoint: ${validationEndpoint}`)
  }
}

export const validateDealerListing = async ({
  dealerId,
  listing,
  options,
}: {
  dealerId: number
  listing: Listing
  options: ApiCallOptions & { validationEndpoint: ListingValidationEndpoint }
}): Promise<WithValidationError<Listing>> => {
  const { validationEndpoint, ...otherOptions } = options
  const data = prepareListingData(listing)

  try {
    await postData({
      path: validationPathForListing(dealerId, listing, validationEndpoint),
      body: data,
      options: {
        isAuthorizedRequest: true,
        ...otherOptions,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: listing,
  }
}

export const saveDealerListing = async ({
  dealerId,
  listing,
  options = {},
}: {
  dealerId: number
  listing: Listing
  options?: ApiCallOptions
}): Promise<WithValidationError<Listing>> => {
  const { id } = listing
  const data = prepareListingData(listing)

  try {
    let result
    if (id) {
      await putData({
        path: `dealers/${dealerId}/listings/${id}`,
        body: data,
        options: {
          isAuthorizedRequest: true,
          ...options,
        },
      })

      result = { id }
    } else {
      result = await postData({
        path: `dealers/${dealerId}/listings`,
        body: data,
        options: {
          isAuthorizedRequest: true,
          ...options,
        },
      })
    }

    return {
      tag: "success",
      result: { ...listing, ...result },
    }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const publishDealerListing = async ({
  dealerId,
  listing,
  options = {},
}: {
  dealerId: number
  listing: Listing
  options?: ApiCallOptions
}): Promise<WithValidationError<Listing>> => {
  const { id } = listing

  try {
    await postData({
      path: `dealers/${dealerId}/listings/${id}/publish`,
      body: {},
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: listing,
  }
}

export const archiveDealerListing = async ({
  dealerId,
  listingId,
  options,
}: {
  dealerId: number
  listingId: number
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `dealers/${dealerId}/listings/${listingId}/archive`,
      body: {},
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: {},
  }
}

export const bulkArchiveDealerListings = async ({
  dealerId,
  listingIds,
  options,
}: {
  dealerId: number
  listingIds: number[]
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `dealers/${dealerId}/listings/archive`,
      body: {
        elements: listingIds,
      },
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: {},
  }
}

export const unpublishDealerListing = async ({
  listingId,
  dealerId,
  options = {},
}: {
  listingId: number
  dealerId: number
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `dealers/${dealerId}/listings/${listingId}/unpublish`,
      body: {},
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: {},
  }
}

export const transferDealerListingToManual = async ({
  listingId,
  dealerId,
  options = {},
}: {
  listingId: number
  dealerId: number
  options: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `dealers/${dealerId}/listings/${listingId}/transfer-to-manual`,
      body: {},
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: {},
  }
}

export const transferDealerListingsToManual = async ({
  dealerId,
  listingIds,
  options = {},
}: {
  dealerId: number
  listingIds: number[]
  options: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `dealers/${dealerId}/listings/transfer-to-manual`,
      body: {
        elements: listingIds,
      },
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: {},
  }
}

export const hideListing = async ({
  listingId,
  dealerId,
  options = {},
}: {
  listingId: number
  dealerId: number
  options: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `dealers/${dealerId}/listings/${listingId}/hide`,
      body: {},
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: {},
  }
}

export const unhideListing = async ({
  listingId,
  dealerId,
  options = {},
}: {
  listingId: number
  dealerId: number
  options: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: `dealers/${dealerId}/listings/${listingId}/unhide`,
      body: {},
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
  } catch (error) {
    return handleValidationError(error)
  }

  return {
    tag: "success",
    result: {},
  }
}

export const listingMandatoryFields = async ({
  dealerId,
  options = {},
}: {
  dealerId: number
  options?: ApiCallOptions
}): Promise<Set<string>> => {
  const data = await fetchPath({
    path: `dealers/${dealerId}/listings/publish/mandatory-fields`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

  return new Set(data.map((entry) => entry.param))
}

export const getAllDealerFrameNumbers = async ({
  dealerId,
  query,
  options = {},
}: {
  dealerId: number
  query: string
  options?: ApiCallOptions
}): Promise<string[]> =>
  await fetchPath({
    path: `dealers/${dealerId}/frame-numbers?q=${query}`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
