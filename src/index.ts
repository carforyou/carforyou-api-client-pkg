import apiClient from "./apiClient"

export { ResponseError } from "./responseError"
export { fetchGBDScores } from "./calls/car/goodBadDealData"
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
} from "./calls/car/inventoryData"
export { fetchMakes } from "./calls/catalogue"

export default {
  configure: configuration => apiClient.configure(configuration),
  getConfiguration: () => ({
    ...apiClient.configuration,
    version: apiClient.version
  })
}
