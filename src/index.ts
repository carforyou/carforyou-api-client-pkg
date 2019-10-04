import apiClient from "./apiClient"

export {
  Make,
  Model,
  Dealer,
  Option,
  Options,
  ImageEnrichment,
  SavedSearch,
  MessageLead,
  MoneybackApplication
} from "./types/models"

export {
  LifecycleState,
  SearchListing,
  Listing,
  ListingImage
} from "./types/models/listing"

export { SearchType, Type } from "./types/models/type"

export {
  MakeModelFilter,
  LocationFilter,
  ConsumptionCategory,
  FilterParams,
  PaginationParams,
  QueryParams,
  SearchParams
} from "./types/params/listings"

export { SearchTypeQueryParams } from "./types/params/types"

export { SortOrderParams, SortTypeParams, SortParams } from "./types/sort"

export {
  WithValidationError,
  ValidationError
} from "./types/withValidationError"

export { Paginated } from "./types/pagination"

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
export { fetchTypeOptions } from "./services/option/type"

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

export {
  fetchMakes,
  fetchModels,
  fetchTypes,
  fetchType
} from "./services/catalogue"
export { fetchDealer, fetchDealerSuggestions } from "./services/dealer"
export { sendSavedSearch, deleteSavedSearch } from "./services/userNotification"

export default {
  configure: configuration => apiClient.configure(configuration),
  setHandlers: handlers => apiClient.setHandlers(handlers),
  setTokens: tokens => apiClient.setTokens(tokens),
  getConfiguration: () => {
    const configuration = apiClient.configuration
    return {
      ...configuration,
      configured: Object.keys(configuration).length > 0,
      version: apiClient.version
    }
  }
}
