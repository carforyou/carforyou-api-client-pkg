import ApiClient from "../apiClient"

describe("ApiClient", () => {
  beforeEach(() => {
    Object.keys(ApiClient.configuration).forEach((key) => {
      delete ApiClient.configuration[key]
    })
  })

  it("sets the version", () => {
    expect(ApiClient.version).toEqual("v1")
  })

  describe("configuration", () => {
    it("can be set", () => {
      ApiClient.configure({
        apiGatewayUrl: "api.gateway.test",
      })

      expect(ApiClient.configuration.apiGatewayUrl).toEqual("api.gateway.test")
    })

    it("cannot be configured twice", () => {
      expect(() => {
        ApiClient.configure({ apiGatewayUrl: "api.gateway.test1" })
        ApiClient.configure({ apiGatewayUrl: "api.gateway.test2" })
      }).toThrowError("Overwriting API client configuration")
    })
  })
})
