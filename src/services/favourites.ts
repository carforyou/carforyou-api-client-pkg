import toQueryString from "../lib/toQueryString"
import { Paginated, SearchListing } from "../index"
import { ApiCallOptions, deletePath, fetchPath, postData } from "../base"

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
} = {}): Promise<Paginated<SearchListing>> => {
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
  // eslint-disable-next-line @typescript-eslint/ban-types
}): Promise<{}> => {
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
}): Promise<Response> => {
  return postData({
    path: "users/me/favorite-listings",
    body: {
      elements: listingIds.map((listingId) => ({ listingId })),
    },
    options: { isAuthorizedRequest: true, ...options },
  })
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
