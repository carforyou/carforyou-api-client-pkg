import ApiClient from "../../src/apiClient"

beforeAll(() => {
  ApiClient.configure({
    host: "test.gateway",
  })
})
