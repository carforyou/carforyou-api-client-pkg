import {
  ValidationError,
  WithValidationError,
} from "./types/withValidationError"
import { WithTopListing } from "./types/topListing"
import { Paginated } from "./types/pagination"
import { SearchListing } from "./types/models/listing"
import { FieldsStats, WithFieldStats } from "./types/fieldStats"
import { Facets } from "./types/facets"

import { ResponseError } from "./responseError"
import apiClient, { ApiVersion } from "./apiClient"

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

const getAuthorizationHeader = (accessToken = null) => {
  if (!accessToken) {
    throw new Error(
      "You tried to make an authenticated requests without providing an access token!\n Please pass a valid token as a request option."
    )
  }

  return { Authorization: `Bearer ${accessToken}` }
}

export const getHost = (host: string = null) => {
  if (!apiClient.configuration.host) {
    throw new Error(
      'ApiClient not configured, please run: ApiClient.configure({ host: "your.api.gateway" }'
    )
  }

  return host || apiClient.configuration.host
}

const buildHeaders = ({
  headers = {},
  accessToken,
  apiVersion,
  isAuthorizedRequest,
}: RequestOptions): Record<string, string> => {
  const version = apiVersion || apiClient.version
  return {
    "Content-Type": "application/json",
    Accept: `application/vnd.carforyou.${version}+json`,
    ...(isAuthorizedRequest ? getAuthorizationHeader(accessToken) : {}),
    ...headers,
  }
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export interface ApiCallOptions extends Omit<RequestInit, "method" | "body"> {
  accessToken?: string
  headers?: Record<string, string>
  host?: string
}

interface RequestOptions extends ApiCallOptions {
  apiVersion?: ApiVersion
  isAuthorizedRequest?: boolean
}

export const fetchPath = async ({
  path,
  body,
  options,
}: {
  path: string
  body?: string
  options: RequestOptions & { method?: Method }
}) => {
  const {
    method = "GET",
    host = null,
    headers,
    apiVersion,
    accessToken,
    isAuthorizedRequest,
    ...fetchOptions
  } = options
  const url = `${getHost(host)}/${stripLeadingSlash(path)}`

  if (apiClient.configuration.debug) {
    // eslint-disable-next-line no-console
    console.info(`    >> API #fetchPath: ${url}`, options)
  }

  const response = await fetch(url, {
    headers: buildHeaders(options),
    method,
    ...(body ? { body } : {}),
    ...fetchOptions,
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
  path,
  body,
  options,
}: {
  path: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  body: object
  options: RequestOptions
}) => {
  return fetchPath({
    path,
    body: JSON.stringify(body),
    options: {
      ...options,
      method: "POST",
    },
  })
}

export const putData = async ({
  path,
  body,
  options,
}: {
  path: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  body: object
  options: RequestOptions
}) => {
  return fetchPath({
    path,
    body: JSON.stringify(body),
    options: {
      ...options,
      method: "PUT",
    },
  })
}

export const deletePath = async ({
  path,
  options,
}: {
  path: string
  options: RequestOptions
}) => {
  return fetchPath({
    path,
    options: {
      ...options,
      method: "DELETE",
    },
  })
}

interface ErrorHandlerOptions {
  swallowErrors?: boolean
}
export const handleValidationError = async (
  error,
  options: ErrorHandlerOptions = {}
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

export async function ignoreServerSideErrors<T>({
  error,
  returnValue,
  errorHandlerOptions = {},
}: {
  error: ResponseError
  returnValue: T
  errorHandlerOptions?: ErrorHandlerOptions
}): Promise<WithValidationError<T>> {
  // Ignore internal server errors
  if (error.response.status.toString().charAt(0) === "5") {
    return {
      tag: "success",
      result: returnValue,
    }
  }

  return handleValidationError(error, errorHandlerOptions)
}
