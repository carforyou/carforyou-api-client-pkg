# CAR FOR YOU API Client

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Usage

```
npm install @carforyou/api-client
```

Initialize the API client:

```
import ApiClient from "@carforyou/api-client"

ApiClient.configure(<your_configuration_object>)
```

Import the `fetchXYZ` call you need and use in your code:

```
import { fetchBodyTypes } from "@carforyou/api-client"

fetchBodyTypes()
```

## Configuration

| Option Name                  | Meaning                                                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `carServiceUrl`              | URL to [CarForYou Service](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html)                    |
| `searchServiceUrl`           | URL to [Inventory Search Service](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html)      |
| `catalogueServiceUrl`        | URL to [Catalogue Service](https://catalogue-service.preprod.carforyou.ch/swagger-ui/index.html#/Product_Catalogue) |
| `dealerServiceUrl`           | URL to [Dealer Service](https://dealer-service.preprod.carforyou.ch/swagger-ui/index.html)                          |
| `optionServiceUrl`           | URL to [Options Service](https://option-service.preprod.carforyou.ch/swagger-ui/index.html)                         |
| `analyticsServiceUrl`        | URL to [Analytics Service](https://carforyou-analytics-service.preprod.carforyou.ch/swagger-ui/index.html)          |
| `userNotificationServiceUrl` | URL to [User Notification Service](https://user-notification-service.preprod.carforyou.ch/swagger-ui/index.html)    |
| `tokenRefreshServiceUrl`     | URL to Auth Service used to refresh access tokens                                                                   |
| `debug`                      | Set to `true` to `console.log` requests and API responses.                                                          |

## Following API calls are handled

Also accompanying modes and param types, as well as default values, are exported.

### [CarForYou service](carforyou-service.preprod.carforyou.ch)

- [Good-Bad Deal data](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Good-Bad_Deal_Data)
  - [`featchDealScores`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Good-Bad%20Deal%20Data/getScoresUsingGET)
- [Image](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Image)
  - [`fetchImageEnrichment`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Image/getByImageIdUsingGET)
  - [`generatePresignedImageUrl`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Image/generatePresignedUrlUsingPOST)
  - [`saveDealerListingImages`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Image/setListingImagesUsingPUT)
- [Inventory](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory)
  - [`fetchListing`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/getUsingGET_1)
  - [`fetchDealerMakes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/getAllDealerMakesUsingGET)
  - [`fetchDealerListingsCount`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/countUsingGET)
  - [`fetchDealerListings`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/getAllUsingGET)
  - [`fetchDealerListing`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/getUsingGET)
  - `validateDealerListing`
    - [for saving as draft](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/validateCreateUsingPOST)
    - [for publication](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/validatePublishUsingPOST)
  - `saveDealerListing`
    - [new listing](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/createUsingPOST)
    - [existing listing](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/updateUsingPUT)
  - [`publishDealerListing`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/operations/Inventory/publishUsingPOST)
  - [`archiveDealerListing`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/archiveUsingPOST)
  - [`unpublishDealerListing`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/unpublishUsingPOST)
  - [`listingMandatoryFields`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory/getPublishingMandatoryFieldsUsingGET)
- [Inventory data](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory_Data)
  - [`fetchBodyTypes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/getBodyTypesUsingGET)
  - [`fetchColorGroups`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/getColorGroupsUsingGET)
  - [`fetchColors`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/getColorsUsingGET)
  - [`fetchConditionTypes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/getConditionTypesUsingGET)
  - [`fetchDoors`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/findDistinctDoorsUsingGET)
  - [`fetchDriveTypes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/getDriveTypesUsingGET)
  - [`fetchFuelTypeGroups`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/getFuelTypeGroupsUsingGET)
  - [`fetchFuelTypes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/getFuelTypesUsingGET)
  - [`fetchMinFirstRegistrationYear`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/findMinRegistrationYearUsingGET)
  - [`fetchOptions`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/getOptionsUsingGET)
  - [`fetchSeats`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/findDistinctSeatsUsingGET)
  - [`fetchTransmissionTypes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Inventory%20Data/getTransmissionTypesUsingGET)
- [Lead](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Lead)
  - [`sendMessageLead`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Lead/createMessageLeadUsingPOST)
- [Leasing](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Leasing)
  - [`fetchLeasingFormUrl`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Leasing/generateLeasingProviderFormUrlUsingPOST)
  - [`sendLeasingInterest`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Leasing/createLeasingInterestUsingPOST)
- [Money Back Guarantee](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Money_Back_Guarantee)
  - [`sendMoneybackApplication`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Money%20Back%20Guarantee/createMbgApplicationUsingPOST)
- [Buy Now](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Buy%20Now)
  - [`sendBuyNowApplication`](https://carforyou-service.preprod.carforyou.ch/swagger-ui/index.html#/Buy%20Now/createBuyNowApplicationUsingPOST)

### [Options service](https://option-service.preprod.carforyou.ch/swagger-ui/index.html)

- [Listing](https://option-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing)
  - [`fetchListingOptions`](https://option-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing/getListingOptionsUsingGET_1)
  - [`fetchDealerListingOptions`](https://option-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing/getListingOptionsUsingGET)
  - [`saveDealerListingOptions`](https://option-service.preprod.carforyou.ch/swagger-ui/index.html#/Option/setListingOptionsUsingPUT)
- [Type](https://option-service.preprod.carforyou.ch/swagger-ui/index.html#/Type)
  - [`fetchTypeOptions`](https://option-service.preprod.carforyou.ch/swagger-ui/index.html#/Type/getTypeOptionsUsingGET)

### [Inventory search service](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html)

- [Cities](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Cities)

  - [`fetchCity`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Cities/getUsingGET)
  - [`fetchCitySuggestions`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Cities/getSuggestionsUsingGET)

- [Regions](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Regions)
  - [`fetchRegions`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Regions/getAllUsingGET)

* [Current Makes/Models](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Current_Makes/Models)

  - [`fetchCurrentMakes`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Current%20Makes/Models/getCurrentMakesUsingGET)
  - [`fetchCurrentModels`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Current%20Makes/Models/getCurrentModelsUsingGET)

* [Listing Search](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing_Search)

  - [`fetchListingCount`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing%20Search/countUsingPOST)
  - [`fetchListings`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing%20Search/searchUsingPOST)
  - [`fetchMoneybackListings`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing%20Search/findAllMbgListingsUsingGET)
  - [`fetchFacets`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing%20Search/getFacetsUsingPOST)

* [Type Search](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Type_Search)

  - [`fetchTypes`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Type%20Search/searchUsingPOST_2)
  - [`fetchTypeFacets`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Type%20Search/getFacetsUsingPOST_1)

* [Needs Assessment](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Needs_Assessment)

  - [`fetchNeedsAssesmentListings`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Needs%20Assessment/searchUsingPOST_1)

* [Saved Searches (Auto-Alarm)](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing%20saved%20searches)

  - [`fetchSavedSearches`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing%20saved%20searches/getAllAutoAlarmsUsingGET)
  - [`fetchSavedSearch`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing%20saved%20searches/getAutoAlarmUsingGET)
  - [`putDealerSavedSearch`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing%20saved%20searches/updateAutoAlarmUsingPUT)
  - [`postDealerSavedSearch`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing%20saved%20searches/createAutoAlarmUsingPOST)
  - [`deleteDealerSavedSearch`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing%20saved%20searches/deleteAutoAlarmUsingDELETE)

* [Dealer Search](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Dealer_Search)

  - [`fetchDealers`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Dealer%20Search/searchUsingPOST)

### [Catalogue service](https://catalogue-service.preprod.carforyou.ch/swagger-ui/index.html)

- [Product Catalogue](https://catalogue-service.preprod.carforyou.ch/swagger-ui/index.html#/Product_Catalogue)
  - [`fetchMakes`](https://catalogue-service.preprod.carforyou.ch/swagger-ui/index.html#/Product%20Catalogue/getAllMakesUsingGET)
  - [`fetchModels`](https://catalogue-service.preprod.carforyou.ch/swagger-ui/index.html#/Product%20Catalogue/getModelsUsingGET)
  - [`fetchType`](https://catalogue-service.preprod.carforyou.ch/swagger-ui/index.html#/Product%20Catalogue/getTypeUsingGET)

### [Dealer service](https://dealer-service.preprod.carforyou.ch/swagger-ui/index.html)

- [Dealer](https://dealer-service.preprod.carforyou.ch/swagger-ui/index.html#/Dealer)
  - [`fetchDealer`](https://dealer-service.preprod.carforyou.ch/swagger-ui/index.html#/Dealer/getUsingGET)
  - [`fetchDealerSuggestions`](https://dealer-service.preprod.carforyou.ch/swagger-ui/index.html#/Dealer/getSuggestionsUsingGET)
  - [`fetchDealerProfile`](https://dealer-service.preprod.carforyou.ch/swagger-ui/index.html#/Dealer/getProfileUsingGET)
  - [`putDealerProfile`](https://dealer-service.preprod.carforyou.ch/swagger-ui/index.html#/Dealer/updateProfileUsingPUT)
  - [`fetchDealerPromotion`](https://dealer-service.preprod.carforyou.ch/swagger-ui/index.html#/Dealer/getPromotionUsingGET)
  - [`postDealerPromotion`](https://dealer-service.preprod.carforyou.ch/swagger-ui/index.html#/Dealer/createPromotionUsingPOST)
  - [`putDealerPromotion`](https://dealer-service.preprod.carforyou.ch/swagger-ui/index.html#/Dealer/updatePromotionUsingPUT)

### [User notification service](https://user-notification-service.preprod.carforyou.ch/swagger-ui/index.html)

- [Saved Search](https://user-notification-service.preprod.carforyou.ch/swagger-ui/index.html#/Saved_Search)
  - [`sendSavedSearch`](https://user-notification-service.preprod.carforyou.ch/swagger-ui/index.html#/Saved%20Search/createSavedSearchUsingPOST)
  - [`deleteSavedSearch`](https://user-notification-service.preprod.carforyou.ch/swagger-ui/index.html#/Saved%20Search/deleteSavedSearchUsingDELETE)

### [Analytics service](https://carforyou-analytics-service.preprod.carforyou.ch/swagger-ui/index.html)

- [Analytics](https://carforyou-analytics-service.preprod.carforyou.ch/swagger-ui/index.html#/Analytics)
  - [fetchAnalyticsData](https://carforyou-analytics-service.preprod.carforyou.ch/swagger-ui/index.html#/Analytics/getListingsMetricsUsingPOST)
  - [fetchLeadsAnalytics](https://reporting-service.preprod.carforyou.ch/swagger-ui/index.html#/Analytics/getDealerLeadsAnalyticsUsingPOST)
  - [fetchListingsAnalytics](https://reporting-service.preprod.carforyou.ch/swagger-ui/index.html#/Analytics/getDealerListingsAnalyticsUsingPOST)

## Mocking in tests

To be able to mock api calls in tests you need to:

- require the API call to be mocked in your test file:
  ```javascript
  import { fetchListing } from "@carforyou/api-client"
  ```
- use jest mocking to mock the module:
  ```javascript
  jest.mock("@carforyou/api-client", () => ({
    // Add this if you want to have access to other exported methods
    ...jest.requireActual("@carforyou/api-client"),
    fetchListing: jest.fn(),
  }))
  ```
- you can now set up the mock per test basis:
  ```javascript
    (fetchListing as jest.Mock).mockReturnValue(`<your mocked data>`)
  ```
  typecasting is only needed in TypeScript projects
- and expect on the mocked function:
  ```javascript
  expect(fetchListing).toHaveBeenCalled()
  ```

Be aware that this creates a global mock in your tests. You'd need to clear mock state in `beforeEach`:

```javascript
  (fetchListing as jest.Mock).mockClear()
```

## Factories

Following factories are exported:

- `TypeFactory`
- `SearchTypeFactory`
- `OptionsFactory`
- `ListingFactory`
- `SearchListingFactory`
- `EmptyListing` - builds a listing without any values
- `ListingFromType` - initializes an empty listing with values from a type

## Development

```
npm run build
```

You can link your local npm package to integrate it with any local project:

```
cd carforyou-api-client-pkg
npm run build

cd carforyou-listings-web
npm link ../carforyou-api-client-pkg/pkg
```

## Release a new version

New versions are released on the ci using semantic-release as soon as you merge into master. Please
make sure your merge commit message adheres to the corresponding conventions.
