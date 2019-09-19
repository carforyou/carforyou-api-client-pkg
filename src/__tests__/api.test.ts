import API from "../api"

describe("API", () => {
  it("can be set", () => {
    API.initialize({
      carServiceUrl: "car.service.test"
    })

    expect(API.configuration.carServiceUrl).toEqual("car.service.test")
  })

  it("sets the version", () => {
    expect(API.version).toEqual("v1")
  })

  it("cannot be initialized twice", () => {
    expect(() => {
      API.initialize({ carServiceUrl: "car.service.test1" })
      API.initialize({ carServiceUrl: "car.service.test2" })
    }).toThrowError("Owerwriting API client configuration")
  })
})
