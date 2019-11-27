import apiClient, { Handlers, Tokens, ApiClientConfig } from "./apiClient"

export {
  Make,
  Model,
  Dealer,
  Option,
  Options,
  ImageEnrichment,
  SavedSearch,
  MessageLead,
  MoneybackApplication,
  City,
  PresignedUrl,
  Date,
  OpeningHours
} from "./types/models"

export {
  LifecycleState,
  SearchListing,
  ListingBasicData,
  ListingEnergyData,
  ListingDriveData,
  ListingDescriptionData,
  ListingOptionsData,
  ListingExtrasData,
  Listing,
  ListingImage
} from "./types/models/listing"

export { SearchType, Type } from "./types/models/type"

export { PaginationParams } from "./types/params"
export {
  MakeModelFilter,
  LocationFilter,
  ConsumptionCategory,
  ListingFilterParams,
  ListingQueryParams,
  ListingSearchParams,
  DealerListingQueryParams
} from "./types/params/listings"

export { SearchTypeQueryParams } from "./types/params/types"

export {
  ListingSortOrderParams,
  ListingSortTypeParams,
  ListingSortParams,
  DealerListingSortOrderParams,
  DealerListingSortTypeParams,
  DealerListingSortParams
} from "./types/sort"

export {
  WithValidationError,
  ValidationError
} from "./types/withValidationError"

export { Paginated } from "./types/pagination"

export { ResponseError } from "./responseError"

export { featchDealScores } from "./services/car/goodBadDealData"
export {
  fetchImageEnrichment,
  generatePresignedImageUrl,
  saveDealerListingImages,
  fetchDealerListingImages
} from "./services/car/image"
export {
  fetchListing,
  fetchDealerMakes,
  fetchDealerListingsCount,
  defaultSort as defaultDealerListingsSort,
  defaultPagination as defaultDealerListingsPagination,
  fetchDealerListings,
  fetchDealerListing,
  fetchMoneybackListings,
  publishDealerListing,
  archiveDealerListing,
  unpublishDealerListing,
  listingMandatoryFields,
  ListingValidationEndpoint,
  validateDealerListing,
  saveDealerListing
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

export {
  fetchListingOptions,
  fetchDealerListingOptions,
  saveDealerListingOptions
} from "./services/option/listing"
export { fetchTypeOptions } from "./services/option/type"

export {
  fetchCurrentMakes,
  fetchCurrentModels
} from "./services/search/currentMakeModels"
export {
  fetchListingCount,
  fetchListings,
  fetchNeedsAssesmentListings,
  defaultSort as defaultListingsSort
} from "./services/search/listingSearch"
export { fetchCity, fetchCitySuggestions } from "./services/search/city"

export {
  fetchMakes,
  fetchModels,
  fetchTypes,
  fetchType
} from "./services/catalogue"
export { fetchDealer, fetchDealerSuggestions } from "./services/dealer"
export { sendSavedSearch, deleteSavedSearch } from "./services/userNotification"

export {
  Listing as ListingFactory,
  SearchListing as SearchListingFactory,
  EmptyListing,
  ListingFromType
} from "./lib/factories/listing"
export {
  Type as TypeFactory,
  SearchType as SearchTypeFactory
} from "./lib/factories/type"
export { default as PaginatedFactory } from "./lib/factories/paginated"
export { Options as OptionsFactory } from "./lib/factories/options"

export const ApiClient = {
  configure: (configuration: ApiClientConfig) =>
    apiClient.configure(configuration),
  setHandlers: (handlers: Handlers) => apiClient.setHandlers(handlers),
  setTokens: (tokens: Tokens) => apiClient.setTokens(tokens),
  getConfiguration: () => {
    const configuration = apiClient.configuration
    return {
      ...configuration,
      configured: Object.keys(configuration).length > 0,
      version: apiClient.version
    }
  }
}
