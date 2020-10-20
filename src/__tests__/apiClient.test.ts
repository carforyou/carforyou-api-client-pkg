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
        carServiceUrl: "car.service.test",
      })

      expect(ApiClient.configuration.carServiceUrl).toEqual("car.service.test")
    })

    it("cannot be configured twice", () => {
      expect(() => {
        ApiClient.configure({ carServiceUrl: "car.service.test1" })
        ApiClient.configure({ carServiceUrl: "car.service.test2" })
      }).toThrowError("Owerwriting API client configuration")
    })
  })

  describe("#getConfiguration", () => {
    it("returns the configuration", () => {
      ApiClient.configure({ carServiceUrl: "dummy" })
      expect(ApiClient.getConfiguration()).toEqual({
        carServiceUrl: "dummy",
        configured: true,
        version: "v1",
      })
    })
  })
})
