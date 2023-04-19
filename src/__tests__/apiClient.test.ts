import ApiClient, { Constructor } from "../apiClient"

describe("ApiClient", () => {
  beforeEach(() => {
    Object.keys(ApiClient.configuration).forEach((key) => {
      delete ApiClient.configuration[key]
    })
  })

  it("returns a singleton", () => {
    expect(ApiClient).toEqual(new Constructor())
  })

  it("sets the version", () => {
    expect(ApiClient.version).toEqual("v1")
  })

  describe("#configure", () => {
    it("configuration can be set", () => {
      ApiClient.configure({
        host: "api.gateway.test",
      })

      expect(ApiClient.configuration.host).toEqual("api.gateway.test")
    })

    it("cannot be configured twice", () => {
      expect(() => {
        ApiClient.configure({ host: "api.gateway.test1" })
        ApiClient.configure({ host: "api.gateway.test2" })
      }).toThrow("Overwriting API client configuration")
    })
  })

  describe("#getConfiguration", () => {
    it("returns the configuration", () => {
      ApiClient.configure({ host: "dummy" })
      expect(ApiClient.getConfiguration()).toEqual({
        host: "dummy",
        configured: true,
        version: "v1",
      })
    })
  })
})
