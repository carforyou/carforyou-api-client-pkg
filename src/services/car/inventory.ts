import { fetchPath, Service, postData, handleValidationError } from "../../base"
import { withTokenRefresh } from "../../tokenRefresh"

import { Paginated } from "../../types/pagination"
import { WithValidationError } from "../../types/withValidationError"
import {
  DealerListingSortOrderParams,
  DealerListingSortTypeParams
} from "../../types/sort"
import { Listing, SearchListing } from "../../types/models/listing"
import { DealerListingQueryParams } from "../../types/params/listings"

import toQueryString from "../../lib/toQueryString"
import { decodeDate, encodeDate } from "../../lib/dateEncoding"

const sanitizeListing = (json): Listing => {
  const {
    firstRegistrationDate,
    lastInspectionDate,
    consumption,
    ...rest
  } = json

  return {
    ...rest,
    consumption,
    firstRegistrationDate: decodeDate(firstRegistrationDate),
    lastInspectionDate: decodeDate(lastInspectionDate),
    consumptionCombined: consumption,
    additionalOptions: [],
    standardOptions: []
  }
}

export const fetchListing = async (id: number): Promise<Listing> => {
  const listing = await fetchPath(Service.CAR, `listings/${id}`)

  return sanitizeListing(listing)
}

export const fetchDealerMakes = async (
  dealerId: number
): Promise<Array<{ make: string; makeKey: string }>> => {
  return fetchPath(Service.CAR, `inventory/dealers/${dealerId}/makes`)
}

export const fetchDealerListingsCount = async (
  dealerId: number,
  query: DealerListingQueryParams
): Promise<number> => {
  return withTokenRefresh(async () => {
    const { count } = await fetchPath(
      Service.CAR,
      `dealers/${dealerId}/listings/count${
        Object.keys(query).length > 0 ? "?" + toQueryString(query) : null
      }`
    )
    return count
  })
}

export const defaultPagination = {
  page: 0,
  size: 25
}

export const defaultSort = {
  sortOrder: DealerListingSortOrderParams.DESC,
  sortType: DealerListingSortTypeParams.CREATED_DATE
}

export const fetchDealerListings = async (
  dealerId: number,
  query: DealerListingQueryParams = {}
): Promise<Paginated<Listing>> => {
  const { page, size, sortOrder, sortType, ...rest } = query

  const sizeOrDefault =
    parseInt((size || "").toString(), 10) || defaultPagination.size
  const pageOrDefault =
    parseInt((page || "").toString(), 10) - 1 || defaultPagination.page

  const sortOrDefault = {
    sortType: sortType || defaultSort.sortType,
    sortOrder: sortOrder || defaultSort.sortOrder
  }

  const queryParams = {
    page: pageOrDefault,
    size: sizeOrDefault,
    sort: `${sortOrDefault.sortType},${sortOrDefault.sortOrder}`,
    ...rest
  }

  const { content, ...response } = await withTokenRefresh(() =>
    fetchPath(
      Service.CAR,
      `dealers/${dealerId}/listings${
        Object.keys(queryParams).length > 0
          ? "?" + toQueryString(queryParams)
          : null
      }`
    )
  )

  return {
    ...response,
    content: content.map(sanitizeListing)
  }
}

export const fetchDealerListing = async ({
  dealerId,
  listingId
}: {
  dealerId: number
  listingId: number
}): Promise<Listing> => {
  const listing = await withTokenRefresh(() =>
    fetchPath(Service.CAR, `dealers/${dealerId}/listings/${listingId}`)
  )

  return sanitizeListing(listing)
}

export const prepareListingData = listing => {
  const { id, firstRegistrationDate, lastInspectionDate, ...rest } = listing

  return {
    ...rest,
    firstRegistrationDate: encodeDate(firstRegistrationDate),
    lastInspectionDate: encodeDate(lastInspectionDate)
  }
}

export enum ListingValidationEndpoint {
  draft = "draft",
  publish = "publish"
}

const validationPathForListing = (dealerId, listing, validationEndpoint) => {
  switch (validationEndpoint) {
    case ListingValidationEndpoint.draft:
      return `dealers/${dealerId}/listings/validate`
    case ListingValidationEndpoint.publish:
      const { id } = listing
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
  validationEndpoint
}: {
  dealerId: number
  listing: Listing
  validationEndpoint: ListingValidationEndpoint
}): Promise<WithValidationError<Listing>> => {
  const data = prepareListingData(listing)

  return withTokenRefresh(async () => {
    try {
      await postData(
        Service.CAR,
        validationPathForListing(dealerId, listing, validationEndpoint),
        data
      )
    } catch (error) {
      return handleValidationError(error)
    }

    return {
      tag: "success",
      result: listing
    }
  })
}

export const publishDealerListing = async ({
  dealerId,
  listing
}: {
  dealerId: number
  listing: Listing
}): Promise<WithValidationError<Listing>> => {
  const { id } = listing

  return withTokenRefresh(async () => {
    try {
      await postData(
        Service.CAR,
        `dealers/${dealerId}/listings/${id}/publish`,
        {}
      )
    } catch (error) {
      return handleValidationError(error)
    }

    return {
      tag: "success",
      result: listing
    }
  })
}

export const archiveDealerListing = async ({
  dealerId,
  id
}: {
  dealerId: number
  id: number
}): Promise<WithValidationError<{}>> => {
  return withTokenRefresh(async () => {
    try {
      await postData(
        Service.CAR,
        `dealers/${dealerId}/listings/${id}/archive`,
        {}
      )
    } catch (error) {
      handleValidationError(error)
    }

    return {
      tag: "success",
      result: {}
    }
  })
}

export const unpublishDealerListing = async ({
  id,
  dealerId
}: {
  id: number
  dealerId: number
}): Promise<WithValidationError<{}>> => {
  return withTokenRefresh(async () => {
    try {
      await postData(
        Service.CAR,
        `dealers/${dealerId}/listings/${id}/unpublish`,
        {}
      )
    } catch (error) {
      handleValidationError(error)
    }

    return {
      tag: "success",
      result: {}
    }
  })
}

export const listingMandatoryFields = async (
  dealerId: number
): Promise<Set<string>> => {
  return withTokenRefresh(async () => {
    const data = await fetchPath(
      Service.CAR,
      `dealers/${dealerId}/listings/publish/mandatory-fields`
    )

    return new Set(data.map(entry => entry.param))
  })
}

export const fetchMoneybackListings = (
  dealerId: number,
  query?: {
    makeKey: string
    size: number
    page: number
  }
): Promise<Paginated<SearchListing>> => {
  return fetchPath(
    Service.CAR,
    `dealers/${dealerId}/mbg-listings?${toQueryString(query)}`
  )
}
