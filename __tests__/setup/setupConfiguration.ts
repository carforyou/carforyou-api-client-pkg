import ApiClient from "../../src/apiClient"

beforeAll(() => {
  ApiClient.configure({
    carServiceUrl: "car.service.test",
    catalogueServiceUrl: "catalogue.service.test",
    dealerServiceUrl: "dealer.service.test",
    searchServiceUrl: "search.service.test"
  })
})
