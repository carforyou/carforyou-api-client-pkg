import apiClient from "./apiClient"

export { ResponseError } from "./responseError"
export { fetchGBDScores } from "./services/car/goodBadDealData"
export {
  fetchBodyTypes,
  fetchColorGroups,
  fetchColors,
  fetchConditionTypes,
  fetchDoors,
  fetchDriveTypes,
  fetchFuelTypeGroups,
  fetchFuelTypes,
  fetchMinFirstRegistrationYear,
  fetchOptions,
  fetchSeats,
  fetchTransmissionTypes
} from "./services/car/inventoryData"
export { fetchMakes, fetchModels } from "./services/catalogue"
export { fetchZipCodes } from "./services/search/zipCodes"

export default {
  configure: configuration => apiClient.configure(configuration),
  getConfiguration: () => ({
    ...apiClient.configuration,
    version: apiClient.version
  })
}
