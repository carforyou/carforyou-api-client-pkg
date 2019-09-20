import "isomorphic-unfetch"

import { Paginated } from "./types/pagination"

import apiClient from "./apiClient"
import { ResponseError } from "./responseError"

export enum Service {
  SEARCH = "SEARCH",
  CATALOGUE = "CATALOGUE",
  CAR = "CAR",
  DEALER = "DEALER"
}

const stripLeadingSlash = (path: string): string => {
  return path.startsWith("/") ? path.slice(1) : path
}

const withPagination = <T>(json) => {
  const { content, ...pagination }: Paginated<T> = json

  return { content, pagination }
}

export const resolveServiceUrl = (service: Service) => {
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
    default:
      throw new Error(`Tried to resolve url of unknown service "${service}"`)
  }

  if ((url || "").trim()) {
    return url
  }

  throw new Error(`Missing endpoint configuration for "${service}" service`)
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
      Authorization: null,
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
