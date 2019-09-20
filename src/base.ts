import apiClient from "./apiClient"

export enum Service {
  SEARCH = "SEARCH",
  CATALOGUE = "CATALOGUE",
  CAR = "CAR",
  DEALER = "DEALER"
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
