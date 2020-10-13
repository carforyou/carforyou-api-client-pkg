import { Paginated } from "./types/pagination"
import { WithFieldStats, FieldsStats } from "./types/fieldStats"
import { Facets } from "./types/facets"
import { ValidationError } from "./types/withValidationError"

import apiClient from "./apiClient"
import { ResponseError } from "./responseError"
import { SearchListing } from "./types/models/listing"
import { WithTopListing } from "./types/topListing"

export enum Service {
  SEARCH = "SEARCH",
  CATALOGUE = "CATALOGUE",
  CAR = "CAR",
  DEALER = "DEALER",
  OPTION = "OPTION",
  ANALYTICS = "ANALYTICS",
  USER_NOTIFICATION = "USER_NOTIFICATION",
}

const stripLeadingSlash = (path: string): string => {
  return path.startsWith("/") ? path.slice(1) : path
}

const withPagination = <T>(json: {
  content: T[]
  number: number
  numberOfElements: number
  size: number
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
  facets: Facets
  fieldsStats: FieldsStats
  topListing: SearchListing
}): WithTopListing<WithFieldStats<Paginated<T>>> => {
  const { content, fieldsStats, facets, topListing, ...pagination } = json

  return { content, fieldsStats, pagination, topListing }
}

export const resolveServiceUrl = (service: Service): string => {
  let url: string
  switch (service) {
    case Service.CAR:
      url = apiClient.configuration.carServiceUrl
      break
    case Service.CATALOGUE:
      url = apiClient.configuration.catalogueServiceUrl
      break
    case Service.SEARCH:
      url = apiClient.configuration.searchServiceUrl
      break
    case Service.DEALER:
      url = apiClient.configuration.dealerServiceUrl
      break
    case Service.OPTION:
      url = apiClient.configuration.optionServiceUrl
      break
    case Service.ANALYTICS:
      url = apiClient.configuration.analyticsServiceUrl
      break
    case Service.USER_NOTIFICATION:
      url = apiClient.configuration.userNotificationServiceUrl
      break
    default:
      throw new Error(`Tried to resolve url of unknown service "${service}"`)
  }

  if ((url || "").trim()) {
    return url
  }

  throw new Error(`Missing endpoint configuration for "${service}" service`)
}

const getAuthorizationHeader = (token = null) => {
  console.log("getAuthorizationHeader instance ", apiClient)
  const accessToken = token || apiClient.accessToken.token
  if (!accessToken) {
    throw new Error(
      "You tried to make an authenticated requests without providing an access token!"
    )
  }

  return { Authorization: `Bearer ${accessToken}` }
}

export interface RequestOptions {
  isAuthorizedRequest?: boolean
  accessToken?: string
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  headers?: {}
}

export const fetchPath = async ({
  service,
  path,
  body,
  options = {},
}: {
  service: Service
  path: string
  body?: string
  options?: RequestOptions
}) => {
  const defaultOptions: RequestOptions = {
    isAuthorizedRequest: false,
    accessToken: null,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: `application/vnd.carforyou.${apiClient.version}+json`,
      ...(options.isAuthorizedRequest
        ? getAuthorizationHeader(options.accessToken)
        : {}),
    },
  }
  const mergedOptions: RequestOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...(options.headers ? options.headers : {}),
    },
  }

  const baseUrl = resolveServiceUrl(service)
  const url = `${baseUrl}/${stripLeadingSlash(path)}`

  if (apiClient.configuration.debug) {
    // eslint-disable-next-line no-console
    console.info(`    >> API #fetchPath: ${url}`, mergedOptions)
  }

  console.log("Request URL", url)
  console.log("Request headers", mergedOptions.headers)

  const { headers, method } = mergedOptions
  const response = await fetch(url, {
    headers,
    method,
    body,
  })

  if (!response.ok) {
    throw new ResponseError(response)
  }

  const text = await response.text()
  const json = text.length > 0 ? JSON.parse(text) : { success: true }

  if (apiClient.configuration.debug) {
    // eslint-disable-next-line no-console
    console.info(`    >> API Response: ${JSON.stringify(json, null, 2)}`)
  }

  if (json.content) {
    return withPagination(json)
  } else {
    return json
  }
}

export const postData = async ({
  service,
  path,
  body,
  options = {},
}: {
  service: Service
  path: string
  body: unknown
  options?: RequestOptions
}) => {
  return fetchPath({
    service,
    path,
    body: JSON.stringify(body),
    options: {
      method: "POST",
      ...options,
    },
  })
}

export const putData = async ({
  service,
  path,
  body,
  options = {},
}: {
  service: Service
  path: string
  body: unknown
  options?: RequestOptions
}) => {
  return fetchPath({
    service,
    path,
    body: JSON.stringify(body),
    options: {
      method: "PUT",
      ...options,
    },
  })
}

export const deletePath = async ({
  service,
  path,
  options = {},
}: {
  service: Service
  path: string
  options?: RequestOptions
}) => {
  return fetchPath({ service, path, options: { method: "DELETE", ...options } })
}

export const handleValidationError = async (
  error,
  options: { swallowErrors?: boolean } = {}
): Promise<ValidationError> => {
  if (
    error.name !== "ResponseError" ||
    ![400, 422].includes(error.response.status)
  ) {
    if (options.swallowErrors) {
      return {
        tag: "error",
        message: "validation.other-error",
        errors: [],
      }
    }

    throw error
  }

  const data = await error.response.json()

  return {
    tag: "error",
    message: data.message.toString() as string,
    errors: data.errors || [],
  }
}
