import { fetchTypes } from "./search/typeSearch"

import { WithValidationError } from "../types/withValidationError"
import { Language } from "../types/params"
import { Paginated } from "../types/pagination"
import { SearchType } from "../types/models/type"
import { Options } from "../types/models"
import toQueryString from "../lib/toQueryString"
import { ApiCallOptions, fetchPath, handleValidationError } from "../base"

export const fetchFrameNumberTypes = async ({
  query,
  options = {},
}: {
  query: { dealerId: number; frameNumber: string; page?: number; size?: number }
  options?: ApiCallOptions
}): Promise<WithValidationError<Paginated<SearchType>>> => {
  try {
    const { dealerId, frameNumber, page, size } = query
    const { types: typeIds } = await fetchPath({
      path: `dealers/${dealerId}/vehicles/frame-number/${frameNumber}`,
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })

    if (!typeIds.length) {
      return {
        tag: "success",
        result: {
          content: [],
          pagination: null,
        },
      }
    }

    const types = await fetchTypes({
      query: { id: typeIds.map(({ id }) => id), page, size },
      options,
    })

    return types
  } catch (error) {
    return handleValidationError(error)
  }
}

export const fetchFrameNumberOptions = async ({
  query: { frameNumber, ...query },
  options = {},
}: {
  query: {
    frameNumber: string
    language: Language
  }
  options?: ApiCallOptions
}): Promise<WithValidationError<Options>> => {
  try {
    const result = await fetchPath({
      path: `vehicles/frame-number/${frameNumber}/equipment?${toQueryString(
        query
      )}`,
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })

    return {
      tag: "success",
      result,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}

export const fetchProductionYearByFrameNumber = async ({
  query,
  options = {},
}: {
  query: { dealerId: number; frameNumber: string }
  options?: ApiCallOptions
}): Promise<WithValidationError<number>> => {
  try {
    const { dealerId, frameNumber } = query
    const { productionYear } = await fetchPath({
      path: `dealers/${dealerId}/vehicles/frame-number/${frameNumber}`,
      options: {
        isAuthorizedRequest: true,
        ...options,
      },
    })
    return {
      tag: "success",
      result: productionYear,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
