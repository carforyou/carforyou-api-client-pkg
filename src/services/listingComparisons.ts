import { ListingComparison } from "../types/models/listingComparison"
import {
  ApiCallOptions,
  deletePath,
  fetchPath,
  handleValidationError,
  postData,
  putData,
} from "../base"
import { WithValidationError } from ".."

export const fetchListingComparisons = async ({
  options = {},
}: {
  options: ApiCallOptions
}): Promise<ListingComparison[]> => {
  return fetchPath({
    path: "users/me/listing-comparisons",
    options: { isAuthorizedRequest: true, ...options },
  })
}

export const fetchListingComparison = async ({
  id,
  options = {},
}: {
  id: number
  options: ApiCallOptions
}): Promise<ListingComparison> => {
  return fetchPath({
    path: `users/me/listing-comparisons/${id}`,
    options: { isAuthorizedRequest: true, ...options },
  })
}

export const createListingComparison = async ({
  listingComparison,
  options = {},
}: {
  listingComparison: Omit<ListingComparison, "id">
  options: ApiCallOptions
}): Promise<WithValidationError<{ id: number }>> => {
  try {
    const result = await postData({
      path: "/users/me/listing-comparisons",
      body: listingComparison,
      options: { isAuthorizedRequest: true, ...options },
    })

    return { tag: "success", result }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const updateListingComparison = async ({
  listingComparison: { id, ...data },
  options = {},
}: {
  listingComparison: ListingComparison
  options: ApiCallOptions
}): Promise<WithValidationError<{ ok: true }>> => {
  try {
    await putData({
      path: `/users/me/listing-comparisons/${id}`,
      body: data,
      options: { isAuthorizedRequest: true, ...options },
    })

    return { tag: "success", result: { ok: true } }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const deleteListingComparison = async ({
  id,
  options = {},
}: {
  id: number
  options: ApiCallOptions
}): Promise<void> => {
  await deletePath({
    path: `/users/me/listing-comparisons/${id}`,
    options: { isAuthorizedRequest: true, ...options },
  })
}
