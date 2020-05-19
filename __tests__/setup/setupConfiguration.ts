import ApiClient from "../../src/apiClient"

beforeAll(() => {
  ApiClient.configure({
    carServiceUrl: "car.service.test",
    catalogueServiceUrl: "catalogue.service.test",
    dealerServiceUrl: "dealer.service.test",
    searchServiceUrl: "search.service.test",
    optionServiceUrl: "option.service.test",
    analyticsServiceUrl: "analytics.service.test",
    userNotificationServiceUrl: "user_notification.service.test",
    tokenRefreshServiceUrl: "token_refresh.service.test",
  })
})
