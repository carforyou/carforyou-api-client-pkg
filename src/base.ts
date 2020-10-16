import { Paginated } from "./types/pagination"
import { WithFieldStats, FieldsStats } from "./types/fieldStats"
import { Facets } from "./types/facets"
import { ValidationError } from "./types/withValidationError"

import apiClient from "./apiClient"
import { ResponseError } from "./responseError"
import { SearchListing } from "./types/models/listing"
import { WithTopListing } from "./types/topListing"

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

const authorizationHeader = () => {
  if (!apiClient.tokens.accessToken) {
    return null
  }

  return `Bearer ${apiClient.tokens.accessToken}`
}

export interface ApiCallOptions extends Omit<RequestInit, "method" | "body"> {
  recaptchaToken?: string
  headers?: Record<string, string>
  host?: string
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

interface RequestOptions extends ApiCallOptions {
  method?: Method
}

export const getHost = (host: string = null) => {
  if (!apiClient.configuration.host) {
    throw new Error(
      'ApiClient not configured, please run: ApiClient.configure({ apiGatewayUrl: "your.api.gateway" }'
    )
  }

  return host || apiClient.configuration.host
}

const buildHeaders = ({
  headers = {},
  recaptchaToken,
}: RequestOptions): Record<string, string> => {
  const auth = authorizationHeader()

  return {
    "Content-Type": "application/json",
    Accept: `application/vnd.carforyou.${apiClient.version}+json`,
    ...(auth ? { Authorization: auth } : {}),
    ...(recaptchaToken ? { "Recaptcha-Token": recaptchaToken } : {}),
    ...headers,
  }
}

export const fetchPath = async ({
  path,
  body,
  options,
}: {
  path: string
  body?: string
  options: RequestOptions
}) => {
  const {
    method = "GET",
    host = null,
    headers,
    recaptchaToken,
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
  options: ApiCallOptions
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
  options: ApiCallOptions
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
  options: ApiCallOptions
}) => {
  return fetchPath({
    path,
    options: {
      ...options,
      method: "DELETE",
    },
  })
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
