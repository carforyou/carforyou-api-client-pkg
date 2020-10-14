import ApiClient from "../../src/apiClient"

beforeAll(() => {
  ApiClient.configure({
    apiGatewayUrl: "test.gateway",
    tokenRefreshServiceUrl: "token_refresh.service.test",
  })
})
