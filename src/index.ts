import apiClient from "./apiClient"

export {
  Make,
  Model,
  Dealer,
  Listing,
  ListingOptions,
  ImageEnrichment,
  SavedSearch,
  MessageLead,
  MoneybackApplication
} from "./types/models"

export {
  WithValidationError,
  ValidationError
} from "./types/withValidationError"
export { ResponseError } from "./responseError"
export { fetchGBDScores } from "./services/car/goodBadDealData"
export { fetchImageEnrichment } from "./services/car/image"
export {
  fetchListing,
  fetchDealerMakes,
  fetchMbgListings
} from "./services/car/inventory"
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
export { fetchDealer, fetchDealerSuggestions } from "./services/dealer"
export { fetchZipCodes } from "./services/search/zipCodes"
export { sendMoneybackApplication } from "./services/car/mbgApplication"
export { sendMessageLead } from "./services/car/messageLead"
export {
  fetchCurrentMakes,
  fetchCurrentModels
} from "./services/search/currentMakeModels"
export {
  fetchListingCount,
  fetchListings,
  defaultSort
} from "./services/search/listingSearch"
export { fetchListingOptions } from "./services/option/listing"

export default {
  configure: configuration => apiClient.configure(configuration),
  getConfiguration: () => ({
    ...apiClient.configuration,
    version: apiClient.version
  })
}
