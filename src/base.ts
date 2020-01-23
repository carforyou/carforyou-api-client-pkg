import "isomorphic-unfetch"

import { Paginated } from "./types/pagination"
import { WithFieldStats, FieldsStats } from "./types/fieldStats"
import { WithFacets, Facets } from "./types/facets"
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
  TOKEN_REFRESH = "TOKEN_REFRESH"
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
}): WithTopListing<WithFacets<WithFieldStats<Paginated<T>>>> => {
  const { content, fieldsStats, facets, topListing, ...pagination } = json

  return { content, fieldsStats, facets, pagination, topListing }
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
    case Service.TOKEN_REFRESH:
      url = apiClient.configuration.tokenRefreshServiceUrl
      break
    default:
      throw new Error(`Tried to resolve url of unknown service "${service}"`)
  }

  if ((url || "").trim()) {
    return url
  }

  throw new Error(`Missing endpoint configuration for "${service}" service`)
}

const authorizationHeader = () => {
  if (!apiClient.tokens.accessToken) {
    return null
  }

  return `Bearer ${apiClient.tokens.accessToken}`
}

export const fetchPath = async (
  service: Service,
  path: string,
  options = {}
) => {
  const prefix = resolveServiceUrl(service)
  const url = `${prefix}/${stripLeadingSlash(path)}`

  if (apiClient.configuration.debug) {
    // tslint:disable-next-line:no-console
    console.log(`    >> API #fetchPath: ${url}`, options)
  }

  const { headers, ...otherOptions } = { headers: {}, ...options }

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: `application/vnd.carforyou.${apiClient.version}+json`,
      Authorization: authorizationHeader(),
      ...headers
    },
    ...otherOptions
  })

  if (!response.ok) {
    throw new ResponseError(response)
  }

  const text = await response.text()
  const json = text.length > 0 ? JSON.parse(text) : { success: true }

  if (apiClient.configuration.debug) {
    // tslint:disable-next-line:no-console
    console.log(`    >> API Response: ${JSON.stringify(json, null, 2)}`)
  }

  if (json.content) {
    return withPagination(json)
  } else {
    return json
  }
}

export const postData = async (
  service: Service,
  path: string,
  body: object,
  headers = {}
) => {
  return fetchPath(service, path, {
    method: "POST",
    body: JSON.stringify(body),
    headers
  })
}

export const putData = async (
  service: Service,
  path: string,
  body: object,
  headers = {}
) => {
  return fetchPath(service, path, {
    method: "PUT",
    body: JSON.stringify(body),
    headers
  })
}

export const deletePath = async (service: Service, path: string) => {
  return fetchPath(service, path, { method: "DELETE" })
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
        errors: []
      }
    }

    throw error
  }

  const data = await error.response.json()

  return {
    tag: "error",
    message: data.message.toString() as string,
    errors: data.errors || []
  }
}
