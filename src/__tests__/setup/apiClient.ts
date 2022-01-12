import ApiClient from "../../apiClient"

beforeAll(() => {
  ApiClient.configure({
    host: "test.gateway",
  })
})
