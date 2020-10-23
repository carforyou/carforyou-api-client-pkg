import {
  fetchPath,
  postData,
  putData,
  handleValidationError,
  ApiCallOptions,
} from "../../base"

import { Paginated } from "../../types/pagination"
import { WithValidationError } from "../../types/withValidationError"
import {
  DealerListingSortOrderParams,
  DealerListingSortTypeParams,
} from "../../types/sort"
import { Listing } from "../../types/models/listing"
import { DealerListingQueryParams } from "../../types/params/listings"

import toQueryString from "../../lib/toQueryString"
import { decodeDate, encodeDate } from "../../lib/dateEncoding"

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

export const fetchDealerListingsCount = async ({
  dealerId,
  query = {},
  options = {},
}: {
  dealerId: number
  query?: DealerListingQueryParams
  options?: ApiCallOptions
}): Promise<number> => {
  const { count } = await fetchPath({
    path: `dealers/${dealerId}/listings/count${
      Object.keys(query).length > 0 ? "?" + toQueryString(query) : null
    }`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })
  return count
}

export const defaultPagination = {
  page: 0,
  size: 25,
}

export const defaultSort = {
  sortOrder: DealerListingSortOrderParams.DESC,
  sortType: DealerListingSortTypeParams.CREATED_DATE,
}

export const fetchDealerListings = async ({
  dealerId,
  query = {},
  options = {},
}: {
  dealerId: number
  query?: DealerListingQueryParams
  options?: ApiCallOptions
}): Promise<Paginated<Listing>> => {
  const { page, size, sortOrder, sortType, ...rest } = query

  const sizeOrDefault =
    parseInt((size || "").toString(), 10) || defaultPagination.size
  const pageOrDefault =
    parseInt((page || "").toString(), 10) - 1 || defaultPagination.page

  const sortOrDefault = {
    sortType: sortType || defaultSort.sortType,
    sortOrder: sortOrder || defaultSort.sortOrder,
  }

  const queryParams = {
    page: pageOrDefault,
    size: sizeOrDefault,
    sort: `${sortOrDefault.sortType},${sortOrDefault.sortOrder}`,
    ...rest,
  }

  const { content, ...response } = await fetchPath({
    path: `dealers/${dealerId}/listings${
      Object.keys(queryParams).length > 0
        ? "?" + toQueryString(queryParams)
        : null
    }`,
    options: {
      isAuthorizedRequest: true,
      ...options,
    },
  })

  return {
    ...response,
    content: content.map(sanitizeListing),
  }
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
