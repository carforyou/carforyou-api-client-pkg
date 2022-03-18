# CAR FOR YOU API Client

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Usage

```
npm install @carforyou/api-client
```

Initialize the API client:

```
import { ApiClient } from "@carforyou/api-client"

ApiClient.configure(<your_configuration_object>)
```

Import the `fetchXYZ` call you need and use in your code:

```
import { fetchReferenceData } from "@carforyou/api-client"

fetchReferenceData()
```

## Configuration

| Option Name | Meaning                                                    |
| ----------- | ---------------------------------------------------------- |
| `host`      | URL to the API gateway                                     |
| `debug`     | Set to `true` to `console.log` requests and API responses. |

### Mocking API calls during development

You can pass a custom `host` with the API calls options object.

Backend offers [stub APIs for each service](https://github.com/carforyou/carforyou-docs#stubs), which you can use:

```
import { fetchListings } from "@carforyou/api-client"

fetchListings({ host: "https://inventory-search-service-stub.dev.carforyou.ch" })
```

If you want to provide your own mock data, serve a mock json file locally with [json-server](https://www.npmjs.com/package/json-server).

```
import { fetchListings } from "@carforyou/api-client"

fetchListings({ host: "http://localhost:3001" })
```

### Authenticated Requests

Requests that need authorization, need to pass a valid JWT to authenticate the user on the requested resource.

#### Implementing authenticated requests

To authenticate a request, simply pass the `isAuthorizedRequest` option to the request helper (fetch/post/put/delete-Data) and the api client will add the `Authorization` header. For server side requests, don't forget to pass the options down to the helper function so the consumer can pass the `accessToken` when invoking the request.

Note: If one forgets to add the `isAuthorizedRequest` option, the access token will not be set as a header. On the consumer side, if the access token is not passed, the api client will throw an error.

#### Performing authenticated requests

Pass the access token as a request option to the api call `dummyFetchCall(data, {accessToken: JWT})`

#### Refreshing Access Tokens

The consumer is responsible to ensure a valid token is passed to the request. The api client will pass the provided token as an `Authorization` header to the api call.

## Following API calls are handled

Also accompanying modes and param types, as well as default values, are exported.

### [CarForYou service](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service)

- [Dealer Default Listing](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Dealer%20Default%20Listing)
  - [`fetchDealerDefaultListingData`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Dealer%20Default%20Listing/get_1)
  - [`saveDealerDefaultListingAdditionalServices](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Dealer%20Default%20Listing/setAdditionalServices)
  - [`saveDealerDefaultListingDescription`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Dealer%20Default%20Listing/setDescription)
  - [`saveDealerDefaultListingWarranty`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Dealer%20Default%20Listing/setWarranty)
  - [`saveDealerDefaultListingGeneralExternalNote`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Dealer%20Default%20Listing/setGeneralExternalNote)

- [Image](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Image)
  - [`generatePresignedImageUrl`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Image/generatePresignedUrl)
  - [`saveDealerListingImages`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Image/setListingImages)

- [Listing](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Listing)
  - [`fetchDealerListing`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Listing/getDealerListing)
  - [`validateDealerListing`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Listing/validateCreate)
  - [`publishDealerListing`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Listing/publish_1)
  - [`unpublishDealerListing`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Listing/unpublish_2)
  - [`bulkUnpublishDealerListings`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Listing/bulkUnpublish_1)
  - [`transferDealerListingToManual`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Listing/transferToManual)
  - [`transferDealerListingsToManual`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Listing/bulkTransferToManual)
  - [`getAllDealerFrameNumbers`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Listing/getAllDealerFrameNumbers)

- [Inventory](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Inventory)
  - [`saveDealerListing`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=carforyou-service#/Inventory/update)


### [Options service](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service)

- [Options](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service#/Option)
  - [`fetchListingOptions`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service#/Option/getListingEquipment_1)
  - [`bulkFetchListingOptions`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service#/Option/bulkGetListingEquipment)
  - [`fetchDealerListingOptions`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service#/Option/getDealerListingEquipment)
  - [`saveDealerListingOptions`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service#/Option/setListingEquipment_1)

- [Type](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service#/Type)
  - [`fetchTypeOptions`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service#/Type/getEquipment_1)

- [Vehicle](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service#/Vehicle)
  - `fetchFrameNumberTypes`
    - it will get type Ids from [vin search](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service#/Vehicle/getVehicle)
  - [`fetchFrameNumberOptions`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service#/Vehicle/getEquipment)
  - [`fetchProductionYearByFrameNumber`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=option-service#/Vehicle/getVehicle)

### [Inventory search service](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service)

- [Listing Search](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search)
  - [`fetchListing`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search/get)
  - [`bulkFetchListing`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search/bulkGet)

- [Cities](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Cities)
  - [`fetchCity`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Cities/get_2)
  - [`fetchCitySuggestions`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Cities/getSuggestions)

* [Current Makes/Models](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Current%20Makes%2FModels)
  - [`fetchCurrentMakes`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Current%20Makes%2FModels/getCurrentMakes)
  - [`fetchCurrentModels`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Current%20Makes%2FModels/getCurrentModels)

* [Listing Search](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search)
  - [`fetchListingCount`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search/count_1)
  - [`fetchListings`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search/search_1)
  - [`fetchFacets`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search/getFacets_1)
  - [`fetchDealerListingsCount`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search/dealerListingCount)
  - [`fetchDealerListings`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search/dealerListingSearch)
  - [`fetchDealerListingsFacets`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search/getDealerListingFacets)
  - [`fetchSearchSuggestions`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search/getSearchSuggestions)
  - [`fetchAggregations`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20Search/getAggregations)

* [Type Search](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Type%20Search)
  - [`fetchTypes`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Type%20Search/search)
  - [`fetchTypeFacets`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Type%20Search/getFacets)

* [Saved Searches (Auto-Alarm)](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20saved%20searches)
  - [`fetchSavedSearches`](https://inventory-search-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing%20saved%20searches/getAllAutoAlarmsUsingGET)
  - [`putDealerSavedSearch`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20saved%20searches/updateAutoAlarm)
  - [`postDealerSavedSearch`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20saved%20searches/createAutoAlarm)
  - [`deleteDealerSavedSearch`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Listing%20saved%20searches/deleteAutoAlarm)

* [Dealer Search](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Dealer%20Search)
  - [`fetchDealers`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=inventory-search-service#/Dealer%20Search/search_2)

### [Catalogue service](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=catalogue-service)

- [Product Catalogue](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=catalogue-service#/Product%20Catalogue)
  - [`fetchMakes`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=catalogue-service#/Product%20Catalogue/getAll)
  - [`fetchModels`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=catalogue-service#/Product%20Catalogue/getAll_1)
  - [`fetchType`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=catalogue-service#/Product%20Catalogue/getType)

### [Dealer service](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service)

- [Dealer](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Dealer)
  - [`fetchDealer`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Dealer/get)
  - [`bulkFetchDealer`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Dealer/bulkGet)
  - [`fetchDealerSuggestions`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Dealer/getSuggestions)
  - [`fetchDealerProfile`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Dealer/getProfile)
  - [`putDealerProfile`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Dealer/updateProfile)
  - [`setLogo`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Dealer/setLogo)
  - [`setImage`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Dealer/setImage)
  - [`putDealerDescription`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Dealer/setDescription)
  - [`fetchDealerPreferences`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Dealer/getPreferences)
  - [`putDealerPreferences`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Dealer/updatePreferences)
- [Product](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Product)
  - [`purchaseAndUseListingProduct`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Product/purchaseProductAndUseSubscriptionForListing)
  - [`bulkPurchaseAndUseListingsProduct`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Product/bulkPurchaseProductAndUseSubscriptionForListing)
  - [`fetchCarSaleTrackingSubscription`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/Product/getValidCarSaleTrackingSubscription)
- [User](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/User) 
  - [putUserAccount](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/User/updateAccount)
  - [`deleteUser`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=dealer-service#/User/deleteUser)

### [Email delivery service](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=email-delivery-service)
  - [`sendSupportCase`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=email-delivery-service#/Support%20Case/create)
  - [`resendMessageLead`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=email-delivery-service#/Email%20delivery/resendMessageLead)

### [User notification service](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=user-notification-service)

- [Saved Search](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=user-notification-service#/Saved%20Search)
  - [`sendSavedSearch`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=user-notification-service#/Saved%20Search/createSavedSearch)
  - [`deleteSavedSearch`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=user-notification-service#/Saved%20Search/deleteSavedSearch)
  - [`fetchSavedSearch`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=user-notification-service#/Saved%20Search/getSavedSearchByKey)
  - [`enableSavedSearch`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=user-notification-service#/Saved%20Search/enableSavedSearch)
  - [`extendSavedSearch`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=user-notification-service#/Saved%20Search/extendSavedSearch)
  - [`sendSavedSearchFeedback`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=user-notification-service#/Saved%20Search/createUnsubscribeFeedback)

### [Reporting service](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service)

- [Dealer Inventory](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Dealer%20Inventory)
  - [`fetchDealerMakes`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Dealer%20Inventory/getDealerMakes)
  - [`fetchDealerOrAssociationMakes`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Dealer%20Inventory/getAllDealerMakes)
  - [`fetchDealerOrAssociationModels`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Dealer%20Inventory/getAllDealerModels)

- [Countries](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Country)
  - [`fetchCountries`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Country/getAll)

- [Reference Data](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Reference%20data)
  - [`fetchReferenceData`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Reference%20data/getReferenceData)

- [Call Tracking](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Call%20Tracking)
  - [`postCallTrackingEntry`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Call%20Tracking/createCallTrackingEntry)

- [Whatsapp Tracking](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/WhatsApp%20Tracking)
  - [`postWhatsappTrackingEntry`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/WhatsApp%20Tracking/createWhatsAppTrackingEntry)

- [Reporting](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Reporting)
  - [`hideMessageLead`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Reporting/hideDealerMessageLead)
  - [`hideCallLead`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Reporting/hideDealerCallLead)
  - [`fetchDealerCallLeads`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Reporting/getAllDealerCallLeads)
  - [`fetchDealerWhatsappLeads`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/WhatsApp%20Tracking/getAllDealerWhatsAppTrackingEntries)
  - [`hideWhatsappLead`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/WhatsApp%20Tracking/hideDealerWhatsAppTrackingEntry)
  - [`fetchCarSales`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Reporting/getDealerCarSales)
  - [`fetchBuyerFeedbackBatch`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Reporting/getBuyerFeedbackBatch)
  - [`fetchMessageLeads`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Reporting/getAllUserMessageLeads)
  - [`fetchFavourites`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Reporting/getUserFavoriteListings)

- [Analytics](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Analytics)
  - [`fetchAnalyticsData`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Analytics/getDealerListingsMetrics)
  - [`fetchLeadsAnalytics`](https://reporting-service.preprod.carforyou.ch/swagger-ui/index.html#/Analytics/getDealerLeadsAnalyticsUsingPOST)
  - [`fetchListingsAnalytics`](https://reporting-service.preprod.carforyou.ch/swagger-ui/index.html#/Analytics/getDealerListingsAnalyticsUsingPOST),
  - [`fetchLeadsInteractionsAnalytics`](https://reporting-service.preprod.carforyou.ch/swagger-ui/index.html#/Analytics/getDealerLeadsInteractionsUsingPOST)
  - [`fetchDealerAnalytics`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=reporting-service#/Analytics/getDealerAnalytics)


### [Car sale tracking service](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service)

- [Buyer feedback](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Buyer%20Feedback)
  - [`addPurchaseConfirmation`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Buyer%20Feedback/addPurchaseConfirmation)

- [Dealer feedback](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Dealer%20Feedback)
  - [`postDealerFeedback`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Dealer%20Feedback/createDealerFeedback)
  - [`postBulkDealerFeedback`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Dealer%20Feedback/bulkCreateDealerFeedback)

- [Car Sale](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Car%20Sale)
  - [`fetchCarSalesCount`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Car%20Sale/countCarSales)
  - [`rejectCarSales`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Car%20Sale/addCarSaleRejection)
  - [`deleteCarSalesRejection`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Car%20Sale/removeCarSaleRejection)

- [Buy Now](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Buy%20Now%20Application)
  - [`sendBuyNowApplication`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Buy%20Now%20Application/createBuyNowApplication)
  - [`fetchBuyNowConfiguration`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Buy%20Now%20Dealer/getConfiguration)
  - [`markBuyNowApplicationAsPaid`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=car-sale-tracking-service#/Buy%20Now%20Application/markAsPaid)

### [Buyer service](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service)

- [Message Lead](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Message%20Lead)
  - [`sendMessageLead`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Message%20Lead/createMessageLead)
  - [`fetchDealerMessageLeads`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Message%20Lead/getListingMessageLeads)

- [Listing questions](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Listing%20question)
  - [`fetchListingQuestions`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Listing%20question/getAllByListingId)
  - [`createQuestion`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Listing%20question/create_2)
  - [`fetchDealerQuestionLeads`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Listing%20question/getAllByDealerId)
  - [`saveAnswerToQuestion`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Listing%20question/answer)
  - [`deleteQuestion`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Listing%20question/delete_2)

- [Buyer Protection](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Buyer%20Protection)
  - [`sendBuyerProtectionApplication`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Buyer%20Protection/createBuyerProtectionApplication)

- [Loan](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Loan%20Interest)
  - [`createLoanInterest`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/Loan%20Interest/create_3)
  - [`calculateMonthlyRate`](https://listing-enrichment-service.preprod.carforyou.ch/swagger-ui/index.html#/Listing/calculateLoanUsingPOST)

- [Favourites](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/User%20Favorite%20Listing)
  - [`saveFavourite`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/User%20Favorite%20Listing/create_1)
  - [`saveFavourites`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/User%20Favorite%20Listing/bulkCreate_1)
  - [`deleteFavourite`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/User%20Favorite%20Listing/delete_1)

- [Listing comparisons](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/User%20Listing%20Comparison)
  - [`fetchListingComparisons`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/User%20Listing%20Comparison/getAll)
  - [`fetchListingComparison`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/User%20Listing%20Comparison/get)
  - [`createListingComparison`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/User%20Listing%20Comparison/create)
  - [`updateListingComparison`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/User%20Listing%20Comparison/update)
  - [`deleteListingComparison`](https://internal.carforyou.dev/api-docs/swagger-ui/?urls.primaryName=buyer-service#/User%20Listing%20Comparison/delete)

- [Leasing](https://internal.carforyou.dev/api-docs/swagger-ui/#/Leasing%20Interest)
  - [`createLeasingInterest`](https://internal.carforyou.dev/api-docs/swagger-ui/#/Leasing%20Interest/create_4)

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
- `SearchMessageLeadFactory` - builds lead email listing
- `SearchCallLeadFactory` - builds lead call listing

## Development

```
npm run build
```

You can link your local npm package to integrate it with any local project:

```
cd carforyou-api-client-pkg
npm run build

cd carforyou-listings-web
npm link ../carforyou-api-client-pkg
```

## Release a new version

New versions are released on the ci using semantic-release as soon as you merge into master. Please
make sure your merge commit message adheres to the corresponding conventions.
