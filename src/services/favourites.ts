import toQueryString from "../lib/toQueryString"
import { Paginated, PartialSearchListing, WithValidationError } from "../index"
import {
  ApiCallOptions,
  deletePath,
  fetchPath,
  handleValidationError,
  postData,
} from "../base"

export const fetchFavourites = async ({
  offset,
  page,
  size,
  options = {},
}: {
  offset?: number
  page?: number
  size?: number
  options?: ApiCallOptions
} = {}): Promise<Paginated<PartialSearchListing>> => {
  const query = toQueryString({ offset, page, size })
  return fetchPath({
    path: `users/me/favorite-listings${query ? "?" + query : ""}`,
    options: { isAuthorizedRequest: true, ...options },
  })
}

export const saveFavourite = async ({
  listingId,
  options = {},
}: {
  listingId: number
  options?: ApiCallOptions
}): Promise<Response> => {
  return postData({
    path: "users/me/favorite-listings",
    body: {
      listingId,
    },
    options: { isAuthorizedRequest: true, ...options },
  })
}

export const saveFavourites = async ({
  listingIds,
  options = {},
}: {
  listingIds: number[]
  options?: ApiCallOptions
}): Promise<WithValidationError> => {
  try {
    await postData({
      path: "users/me/favorite-listings/bulk-create",
      body: {
        elements: listingIds.map((listingId) => ({ listingId })),
      },
      options: { isAuthorizedRequest: true, ...options },
    })

    return { tag: "success", result: { ok: true } }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const deleteFavourite = async ({
  listingId,
  options = {},
}: {
  listingId: number
  options: ApiCallOptions
}): Promise<Response> => {
  return deletePath({
    path: `users/me/favorite-listings/listing-id/${listingId}`,
    options: { isAuthorizedRequest: true, ...options },
  })
}
