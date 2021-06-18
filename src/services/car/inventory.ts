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
  const {
    firstRegistrationDate,
    lastInspectionDate,
    lastServiceDate,
    ...rest
  } = json

  return {
    ...rest,
    firstRegistrationDate: decodeDate(firstRegistrationDate),
    lastInspectionDate: decodeDate(lastInspectionDate),
    lastServiceDate: decodeDate(lastServiceDate),
    standard: [],
    optional: [],
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

export const fetchDealerOrAssociationMakes = async ({
  dealerId,
  association,
  page,
  size,
  options = {},
}: {
  dealerId?: number
  association?: string
  page?: number
  size?: number
  options?: ApiCallOptions
}): Promise<Paginated<{ make: string; makeKey: string }>> => {
  return fetchPath({
    path: `dealers/makes?${toQueryString({
      dealerId,
      association,
      page,
      size,
    })}`,
    options,
  })
}

export const fetchDealerOrAssociationModels = async ({
  dealerId,
  association,
  makeKey,
  page,
  size,
  options = {},
}: {
  dealerId?: number
  association?: string
  makeKey: string
  page?: number
  size?: number
  options?: ApiCallOptions
}): Promise<Paginated<{ model: string; modelKey: string }>> => {
  return fetchPath({
    path: `dealers/models?${toQueryString({
      dealerId,
      association,
      makeKey,
      page,
      size,
    })}`,
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
  const {
    id,
    firstRegistrationDate,
    lastInspectionDate,
    lastServiceDate,
    ...rest
  } = listing

  return {
    ...rest,
    firstRegistrationDate: encodeDate(firstRegistrationDate),
    lastInspectionDate: encodeDate(lastInspectionDate),
    lastServiceDate: encodeDate(lastServiceDate),
  }
}

export const validateDealerListing = async ({
  dealerId,
  listing,
  options,
}: {
  dealerId: number
  listing: Listing
  options: ApiCallOptions
}): Promise<WithValidationError<Listing>> => {
  const data = prepareListingData(listing)

  try {
    await postData({
      path: `dealers/${dealerId}/listings/validate`,
      body: data,
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
      path: `dealers/${dealerId}/listings/bulk-archive`,
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
      path: `dealers/${dealerId}/listings/bulk-transfer-to-manual`,
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
