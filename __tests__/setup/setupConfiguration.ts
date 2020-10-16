import ApiClient from "../../src/apiClient"

beforeAll(() => {
  ApiClient.configure({
    host: "test.gateway",
    tokenRefreshServiceUrl: "token_refresh.service.test",
  })
})
