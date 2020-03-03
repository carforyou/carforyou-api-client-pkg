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

| Option Name                  | Meaning                                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `carServiceUrl`              | URL to [CarForYou Service](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html)                    |
| `searchServiceUrl`           | URL to [Inventory Search Service](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html)      |
| `catalogueServiceUrl`        | URL to [Catalogue Service](https://catalogue-service.preprod.carforyou.ch/swagger-ui.html#/Product_Catalogue) |
| `dealerServiceUrl`           | URL to [Dealer Service](https://dealer-service.preprod.carforyou.ch/swagger-ui.html)                          |
| `optionServiceUrl`           | URL to [Options Service](https://option-service.preprod.carforyou.ch/swagger-ui.html)                         |
| `analyticsServiceUrl`        | URL to [Analytics Service](https://carforyou-analytics-service.preprod.carforyou.ch/swagger-ui.html)          |
| `userNotificationServiceUrl` | URL to [User Notification Service](https://user-notification-service.preprod.carforyou.ch/swagger-ui.html)    |
| `tokenRefreshServiceUrl`     | URL to Auth Service used to refresh access tokens                                                             |
| `debug`                      | Set to `true` to `console.log` requests and API responses.                                                    |

## Following API calls are handled

Also accompanying modes and param types, as well as default values, are exported.

### [CarForYou service](carforyou-service.preprod.carforyou.ch)

- [Good-Bad Deal data](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Good-Bad_Deal_Data)
  - [`featchDealScores`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Good-Bad%20Deal%20Data/getScoresUsingGET)
- [Image](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Image)
  - [`fetchImageEnrichment`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Image/getByImageIdUsingGET)
  - [`generatePresignedImageUrl`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Image/generatePresignedUrlUsingPOST)
  - [`saveDealerListingImages`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Image/setListingImagesUsingPUT)
- [Inventory](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory)
  - [`fetchListing`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/getUsingGET_1)
  - [`fetchDealerMakes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/getAllDealerMakesUsingGET)
  - [`fetchDealerListingsCount`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/countUsingGET)
  - [`fetchDealerListings`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/getAllUsingGET)
  - [`fetchDealerListing`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/getUsingGET)
  - `validateDealerListing`
    - [for saving as draft](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/validateCreateUsingPOST)
    - [for publication](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/validatePublishUsingPOST)
  - `saveDealerListing`
    - [new listing](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/createUsingPOST)
    - [existing listing](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/updateUsingPUT)
  - [`publishDealerListing`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/operations/Inventory/publishUsingPOST)
  - [`archiveDealerListing`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/archiveUsingPOST)
  - [`unpublishDealerListing`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/unpublishUsingPOST)
  - [`listingMandatoryFields`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory/getPublishingMandatoryFieldsUsingGET)
- [Inventory data](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory_Data)
  - [`fetchBodyTypes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/getBodyTypesUsingGET)
  - [`fetchColorGroups`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/getColorGroupsUsingGET)
  - [`fetchColors`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/getColorsUsingGET)
  - [`fetchConditionTypes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/getConditionTypesUsingGET)
  - [`fetchDoors`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/findDistinctDoorsUsingGET)
  - [`fetchDriveTypes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/getDriveTypesUsingGET)
  - [`fetchFuelTypeGroups`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/getFuelTypeGroupsUsingGET)
  - [`fetchFuelTypes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/getFuelTypesUsingGET)
  - [`fetchMinFirstRegistrationYear`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/findMinRegistrationYearUsingGET)
  - [`fetchOptions`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/getOptionsUsingGET)
  - [`fetchSeats`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/findDistinctSeatsUsingGET)
  - [`fetchTransmissionTypes`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Inventory%20Data/getTransmissionTypesUsingGET)
- [Lead](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Lead)
  - [`sendMessageLead`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Lead/createMessageLeadUsingPOST)
- [Money Back Guarantee](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Money_Back_Guarantee)
  - [`sendMoneybackApplication`](https://carforyou-service.preprod.carforyou.ch/swagger-ui.html#/Money%20Back%20Guarantee/createMbgApplicationUsingPOST)

### [Options service](https://option-service.preprod.carforyou.ch/swagger-ui.html)

- [Listing](https://option-service.preprod.carforyou.ch/swagger-ui.html#/Listing)
  - [`fetchListingOptions`](https://option-service.preprod.carforyou.ch/swagger-ui.html#/Listing/getListingOptionsUsingGET_1)
  - [`fetchDealerListingOptions`](https://option-service.preprod.carforyou.ch/swagger-ui.html#/Listing/getListingOptionsUsingGET)
  - [`saveDealerListingOptions`](https://option-service.preprod.carforyou.ch/swagger-ui.html#/Option/setListingOptionsUsingPUT)
- [Type](https://option-service.preprod.carforyou.ch/swagger-ui.html#/Type)
  - [`fetchTypeOptions`](https://option-service.preprod.carforyou.ch/swagger-ui.html#/Type/getTypeOptionsUsingGET)

### [Inventory search service](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html)

- [Cities](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Cities)
  - [`fetchCity`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Cities/getUsingGET)
  - [`fetchCitySuggestions`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Cities/getSuggestionsUsingGET)

- [Regions](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Regions)
  - [`fetchRegions`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Regions/getAllUsingGET)

* [Current Makes/Models](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Current_Makes/Models)

  - [`fetchCurrentMakes`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Current%20Makes/Models/getCurrentMakesUsingGET)
  - [`fetchCurrentModels`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Current%20Makes/Models/getCurrentModelsUsingGET)

* [Listing Search](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Listing_Search)

  - [`fetchListingCount`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Listing%20Search/countUsingPOST)
  - [`fetchListings`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Listing%20Search/searchUsingPOST)
  - [`fetchMoneybackListings`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Listing%20Search/findAllMbgListingsUsingGET)

* [Needs Assessment](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Needs_Assessment)
  - [`fetchNeedsAssesmentListings`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui.html#/Needs%20Assessment/searchUsingPOST_1)

### [Catalogue service](https://catalogue-service.preprod.carforyou.ch/swagger-ui.html)

- [Product Catalogue](https://catalogue-service.preprod.carforyou.ch/swagger-ui.html#/Product_Catalogue)
  - [`fetchMakes`](https://catalogue-service.preprod.carforyou.ch/swagger-ui.html#/Product%20Catalogue/getAllMakesUsingGET)
  - [`fetchModels`](https://catalogue-service.preprod.carforyou.ch/swagger-ui.html#/Product%20Catalogue/getModelsUsingGET)
  - [`fetchTypes`](https://catalogue-service.preprod.carforyou.ch/swagger-ui.html#/Product%20Catalogue/getTypesUsingGET)
  - [`fetchType`](https://catalogue-service.preprod.carforyou.ch/swagger-ui.html#/Product%20Catalogue/getTypeUsingGET)

### [Dealer service](https://dealer-service.preprod.carforyou.ch/swagger-ui.html)

- [Dealer](https://dealer-service.preprod.carforyou.ch/swagger-ui.html#/Dealer)
  - [`fetchDealer`](https://dealer-service.preprod.carforyou.ch/swagger-ui.html#/Dealer/getUsingGET)
  - [`fetchDealerSuggestions`](https://dealer-service.preprod.carforyou.ch/swagger-ui.html#/Dealer/getSuggestionsUsingGET)
  - [`fetchDealerProfile`](https://dealer-service.preprod.carforyou.ch/swagger-ui.html#/Dealer/getProfileUsingGET)
  - [`putDealerProfile`](https://dealer-service.preprod.carforyou.ch/swagger-ui.html#/Dealer/updateProfileUsingPUT)

### [User notification service](https://user-notification-service.preprod.carforyou.ch/swagger-ui.html)

- [Saved Search](https://user-notification-service.preprod.carforyou.ch/swagger-ui.html#/Saved_Search)
  - [`sendSavedSearch`](https://user-notification-service.preprod.carforyou.ch/swagger-ui.html#/Saved%20Search/createSavedSearchUsingPOST)
  - [`deleteSavedSearch`](https://user-notification-service.preprod.carforyou.ch/swagger-ui.html#/Saved%20Search/deleteSavedSearchUsingDELETE)

### [Analytics service](https://carforyou-analytics-service.preprod.carforyou.ch/swagger-ui.html)

- [Analytics](https://carforyou-analytics-service.preprod.carforyou.ch/swagger-ui.html#/Analytics)
  - [fetchAnalyticsData](https://carforyou-analytics-service.preprod.carforyou.ch/swagger-ui.html#/Analytics/getListingsMetricsUsingPOST)

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
    fetchListing: jest.fn()
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
