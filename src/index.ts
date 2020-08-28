import apiClient, { Handlers, Tokens, ApiClientConfig } from "./apiClient"

export {
  Make,
  Model,
  Dealer,
  DealerSourceGroup,
  DealerType,
  Option,
  Options,
  ImageEnrichment,
  SavedSearch,
  MessageLead,
  LeasingInterest,
  MoneybackApplication,
  City,
  PresignedUrl,
  Date,
  OpeningHours,
  Region,
  ListingAnalyticsStats,
  ListingAnalyticsData,
  DealerListingsAnalyticsData,
  DealerEntitlements,
  Entitlements,
} from "./types/models/index"

export {
  LifecycleState,
  SearchListing,
  SearchListingDealer,
  ListingBasicData,
  ListingEnergyData,
  ListingDriveData,
  ListingDescriptionData,
  ListingOptionsData,
  ListingExtrasData,
  Listing,
  ListingImage,
  DealerListingImages,
  ListingSource,
} from "./types/models/listing"

export {
  DealerLocation,
  DealerCarouselPromotion,
  SearchDealer,
} from "./types/models/dealerPromotion"

export { SearchType, Type } from "./types/models/type"
export { Facets, Facet } from "./types/facets"
export { DealerProfile } from "./types/models/dealerProfile"
export {
  DealerPromotion,
  DealerPromotionContent,
} from "./types/models/dealerPromotion"

export {
  DealerSavedSearch,
  DealerSavedSearchQuery,
  ModelType,
  AutoAlarmType,
} from "./types/models/autoAlarm"

export { PaginationParams } from "./types/params"
export {
  MakeModelFilter,
  LocationFilter,
  ConsumptionCategory,
  ListingFilterParams,
  ListingQueryParams,
  ListingSearchParams,
  DealerListingQueryParams,
} from "./types/params/listings"

export {
  DealerLocationFilter,
  DealerQueryParams,
  DealerParams,
} from "./types/params/dealer"

export {
  SearchTypeQueryParams,
  TypeFiltersParams,
  PowerUnit,
} from "./types/params/types"

export {
  ListingSortOrderParams,
  ListingSortTypeParams,
  ListingSortParams,
  DealerListingSortOrderParams,
  DealerListingSortTypeParams,
  DealerListingSortParams,
  DealerSortTypeParams,
  DealerSortParams,
} from "./types/sort"

export {
  Product,
  PurchaseAndUseProduct,
  Feature,
  FeatureBooking,
} from "./types/models/product"

export {
  WithValidationError,
  ValidationError,
} from "./types/withValidationError"

export { Paginated } from "./types/pagination"

export { WithTopListing } from "./types/topListing"

export { ResponseError } from "./responseError"

export { featchDealScores } from "./services/car/goodBadDealData"
export {
  fetchImageEnrichment,
  generatePresignedImageUrl,
  saveDealerListingImages,
  fetchDealerListingImages,
} from "./services/car/image"
export {
  fetchListing,
  fetchDealerMakes,
  fetchDealerListingsCount,
  defaultSort as defaultDealerListingsSort,
  defaultPagination as defaultDealerListingsPagination,
  fetchDealerListings,
  fetchDealerListing,
  publishDealerListing,
  archiveDealerListing,
  unpublishDealerListing,
  listingMandatoryFields,
  ListingValidationEndpoint,
  validateDealerListing,
  saveDealerListing,
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
  fetchTransmissionTypes,
} from "./services/car/inventoryData"
export { sendMoneybackApplication } from "./services/car/moneybackApplication"
export { sendMessageLead } from "./services/car/messageLead"
export {
  fetchLeasingFormUrl,
  sendLeasingInterest,
} from "./services/car/leasing"

export {
  fetchListingOptions,
  fetchDealerListingOptions,
  saveDealerListingOptions,
} from "./services/option/listing"
export { fetchTypeOptions } from "./services/option/type"

export {
  fetchCurrentMakes,
  fetchCurrentModels,
} from "./services/search/currentMakeModels"
export {
  fetchListingCount,
  fetchListings,
  fetchNeedsAssesmentListings,
  defaultSort as defaultListingsSort,
  fetchMoneybackListings,
} from "./services/search/listingSearch"
export { fetchDealers } from "./services/search/dealerSearch"

export { fetchTypes, fetchTypeFacets } from "./services/search/typeSearch"
export { fetchCity, fetchCitySuggestions } from "./services/search/city"
export { fetchRegions } from "./services/search/regions"
export { fetchFacets } from "./services/search/facets"

export { fetchMakes, fetchModels, fetchType } from "./services/catalogue"
export {
  fetchDealer,
  fetchDealerSuggestions,
  fetchDealerProfile,
  putDealerProfile,
  postDealerProfile,
  fetchDealerEntitlements,
  fetchDealerPromotion,
  postDealerPromotion,
  putDealerPromotion,
} from "./services/dealer"
export { sendSavedSearch, deleteSavedSearch } from "./services/userNotification"
export { fetchAnalyticsData } from "./services/analytics"
export {
  fetchProducts,
  purchaseAndUseListingProduct,
  purchaseAndUseDealerProduct,
} from "./services/product"

export {
  fetchSavedSearches,
  fetchSavedSearch,
  putDealerSavedSearch,
  postDealerSavedSearch,
  deleteDealerSavedSearch,
} from "./services/search/autoAlarm"

export {
  Listing as ListingFactory,
  SearchListing as SearchListingFactory,
  EmptyListing,
  ListingFromType,
} from "./lib/factories/listing"

export { DealerSavedSearchFactory } from "./lib/factories/dealerSavedSearch"

export {
  Type as TypeFactory,
  SearchType as SearchTypeFactory,
} from "./lib/factories/type"
export { default as PaginatedFactory } from "./lib/factories/paginated"
export { Options as OptionsFactory } from "./lib/factories/options"
export { withRetries } from "./lib/withRetries"

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
      version: apiClient.version,
    }
  },
}
