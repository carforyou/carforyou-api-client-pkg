import ApiClient from "../apiClient"

describe("ApiClient", () => {
  it("sets the version", () => {
    expect(ApiClient.version).toEqual("v1")
  })

  describe("configuration", () => {
    it("can be set", () => {
      ApiClient.configure({
        carServiceUrl: "car.service.test"
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
})
