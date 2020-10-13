import ApiClient, { Constructor } from "../apiClient"

describe("ApiClient", () => {
  beforeEach(() => {
    Object.keys(ApiClient.configuration).forEach((key) => {
      delete ApiClient.configuration[key]
    })
  })

  it("returns a singelton", () => {
    expect(ApiClient).toEqual(new Constructor())
  })

  it("sets the version", () => {
    expect(ApiClient.version).toEqual("v1")
  })

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

  it("returns the configuration", () => {
    ApiClient.configure({ carServiceUrl: "dummy" })
    expect(ApiClient.getConfiguration()).toEqual({
      carServiceUrl: "dummy",
      configured: true,
      version: "v1",
    })
  })

  it("sets the accessToken", () => {
    const dummyTokenData = {
      token: "Dat token",
      expires: new Date(),
    }
    ApiClient.setAccessToken(dummyTokenData)
    expect(ApiClient.accessToken).toEqual(dummyTokenData)
  })

  it("overrrides the accessToken", () => {
    const dummyTokenDataOne = {
      token: "Dat token",
      expires: new Date(),
    }
    const dummyTokenDataTwo = {
      token: "Funky fresh",
      expires: new Date(),
    }
    ApiClient.setAccessToken(dummyTokenDataOne)
    ApiClient.setAccessToken(dummyTokenDataTwo)
    expect(ApiClient.accessToken).toEqual(dummyTokenDataTwo)
  })

  it("throws an error when calling the prototype token refresh handler", async () => {
    await expect(ApiClient.refreshToken()).rejects.toEqual(
      Error(
        "The refreshToken function has not been set the the apiClient instance, use apiClient.setTokenRefresh to pass a function which handles the token refresh"
      )
    )
  })

  it("sets the token refresh handler function", () => {
    const dummyFn = async () => {
      return { accessToken: "Dummy", expires: Date.now().toString() }
    }
    ApiClient.setTokenRefreshHandler(dummyFn)
    expect(ApiClient.refreshToken).toEqual(dummyFn)
  })

  it("overrides the token refresh handler function", () => {
    const dummyFn = async () => {
      return { accessToken: "Dummy", expires: Date.now().toString() }
    }
    const anotherDummyFn = async () => {
      return { accessToken: "Dummy", expires: Date.now().toString() }
    }
    ApiClient.setTokenRefreshHandler(dummyFn)
    ApiClient.setTokenRefreshHandler(anotherDummyFn)
    expect(ApiClient.refreshToken).toEqual(anotherDummyFn)
  })
})
