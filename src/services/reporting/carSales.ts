import { Paginated } from "../../types/pagination"
import { CarSales } from "../../types/models/carSales"

import toQueryString from "../../lib/toQueryString"
import { WithValidationError } from "../../index"
import {
  ApiCallOptions,
  deletePath,
  fetchPath,
  handleValidationError,
  putData,
} from "../../base"

export const fetchCarSales = async ({
  dealerId,
  status,
  page,
  size,
  options = {},
}: {
  dealerId: number
  status: string
  page?: number
  size?: number
  options?: ApiCallOptions
}): Promise<Paginated<CarSales>> => {
  const query = toQueryString({ status, page, size })
  return fetchPath({
    path: `dealers/${dealerId}/car-sales${query ? `?${query}` : ""}`,
    options: { isAuthorizedRequest: true, ...options },
  })
}

const envelopeRequest = async (handler): Promise<WithValidationError<null>> => {
  try {
    await handler
    return {
      tag: "success",
      result: null,
    }
  } catch (error) {
    return handleValidationError({
      error,
      options: { swallowErrors: true },
    })
  }
}

const getRejectionPath = ({
  dealerId,
  carSaleId,
}: {
  dealerId: number
  carSaleId: number
}) => `dealers/${dealerId}/care-sales/${carSaleId}/rejection`

export const rejectCarSales = async ({
  dealerId,
  carSaleId,
  options = {},
}: {
  dealerId: number
  carSaleId: number
  options?: ApiCallOptions
}): Promise<WithValidationError<null>> => {
  return envelopeRequest(
    putData({
      path: getRejectionPath({ dealerId, carSaleId }),
      body: {},
      options: {
        ...options,
        isAuthorizedRequest: true,
        apiVersion: "v1",
      },
    })
  )
}

export const deleteCarSalesRejection = async ({
  dealerId,
  carSaleId,
  options = {},
}: {
  dealerId: number
  carSaleId: number
  options?: ApiCallOptions
}): Promise<WithValidationError<null>> => {
  return envelopeRequest(
    deletePath({
      path: getRejectionPath({ dealerId, carSaleId }),
      options: {
        ...options,
        isAuthorizedRequest: true,
        apiVersion: "v1",
      },
    })
  )
}
