import apiClient from "./apiClient"

export {
  Make,
  Model,
  Dealer,
  LifecycleState,
  SearchListing,
  Listing,
  ListingOptions,
  ListingImage,
  ImageEnrichment,
  SavedSearch,
  MessageLead,
  MoneybackApplication
} from "./types/models"

export {
  MakeModelFilter,
  LocationFilter,
  ConsumptionCategory,
  FilterParams,
  PaginationParams,
  QueryParams,
  SearchParams
} from "./types/params"

export { SortOrderParams, SortTypeParams, SortParams } from "./types/sort"

export {
  WithValidationError,
  ValidationError
} from "./types/withValidationError"

export { ResponseError } from "./responseError"

export { featchDealScores } from "./services/car/goodBadDealData"
export { fetchImageEnrichment } from "./services/car/image"
export {
  fetchListing,
  fetchDealerMakes,
  fetchMoneybackListings
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
export { sendMoneybackApplication } from "./services/car/moneybackApplication"
export { sendMessageLead } from "./services/car/messageLead"

export { fetchListingOptions } from "./services/option/listing"

export {
  fetchCurrentMakes,
  fetchCurrentModels
} from "./services/search/currentMakeModels"
export {
  fetchListingCount,
  fetchListings,
  fetchNeedsAssesmentListings,
  defaultSort
} from "./services/search/listingSearch"
export { fetchZipCodes } from "./services/search/zipCodes"
export { fetchCitySuggestions } from "./services/search/city"

export { fetchMakes, fetchModels } from "./services/catalogue"
export { fetchDealer, fetchDealerSuggestions } from "./services/dealer"
export { sendSavedSearch, deleteSavedSearch } from "./services/userNotification"

export default {
  configure: configuration => apiClient.configure(configuration),
  getConfiguration: () => {
    const configuration = apiClient.configuration
    return {
      ...configuration,
      configured: Object.keys(configuration).length > 0,
      version: apiClient.version
    }
  }
}
