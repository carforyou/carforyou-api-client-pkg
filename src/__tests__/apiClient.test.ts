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
        host: "api.gateway.test",
      })

      expect(ApiClient.configuration.host).toEqual("api.gateway.test")
    })

    it("cannot be configured twice", () => {
      expect(() => {
        ApiClient.configure({ host: "api.gateway.test1" })
        ApiClient.configure({ host: "api.gateway.test2" })
      }).toThrowError("Overwriting API client configuration")
    })
  })
})
