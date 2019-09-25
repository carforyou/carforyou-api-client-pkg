import apiClient from "./apiClient"

export {
  Make,
  Model,
  Dealer,
  Listing,
  ListingOptions,
  ImageEnrichment
} from "./types/models"

export { ResponseError } from "./responseError"
export { fetchGBDScores } from "./services/car/goodBadDealData"
export { fetchImageEnrichment } from "./services/car/image"
export { fetchListing } from "./services/car/inventory"
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
export { fetchDealer } from "./services/dealer"
export { fetchZipCodes } from "./services/search/zipCodes"
export {
  fetchCurrentMakes,
  fetchCurrentModels
} from "./services/search/currentMakeModels"
export { fetchListingOptions } from "./services/option/listing"

export default {
  configure: configuration => apiClient.configure(configuration),
  getConfiguration: () => ({
    ...apiClient.configuration,
    version: apiClient.version
  })
}
