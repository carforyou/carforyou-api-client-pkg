import apiClient from "../apiClient"
import { fetchPath, postData, deletePath, putData, getHost } from "../base"

describe("Base", () => {
  beforeEach(fetchMock.resetMocks)

  describe("#getHost", () => {
    afterEach(() => {
      apiClient.configuration.host = "test.gateway"
    })

    it("throws if ApiClient is not configured", () => {
      delete apiClient.configuration.host

      expect(() => {
        getHost("test.service")
      }).toThrowError(/ApiClient not configured/)
    })

    it("returns gateway url by default", () => {
      expect(getHost()).toEqual("test.gateway")
    })

    it("allows overwriting gateway url", () => {
      expect(getHost("service.stub")).toEqual("service.stub")
    })
  })

  describe("#fetchPath", () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))
    })

    it("strips leading '/' from path", async () => {
      const json = await fetchPath({ path: "/api/path", options: {} })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/path"),
        expect.any(Object)
      )
    })

    it("inserts correct version header", async () => {
      const json = await fetchPath({ path: "/api/path", options: {} })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        method: "GET",
        headers: expect.objectContaining({
          Accept: `application/vnd.carforyou.v1+json`,
        }),
      })
    })

    it("allows setting custom headers", async () => {
      const json = await fetchPath({
        path: "api/path",
        options: {
          headers: { Foo: "bar" },
        },
      })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        method: "GET",
        headers: expect.objectContaining({
          Foo: "bar",
        }),
      })
    })

    describe("without pagination", () => {
      beforeEach(() => {
        fetchMock.mockResponse(JSON.stringify([]))
      })

      it("includes content", async () => {
        const json = await fetchPath({ path: "/api/path", options: {} })
        expect(json).toEqual([])
      })
    })

    describe("with pagination", () => {
      beforeEach(() => {
        fetchMock.mockResponse(JSON.stringify({ content: [], totalPages: 3 }))
      })

      it("includes pagination separately when content field is returned", async () => {
        const json = await fetchPath({ path: "/api/path", options: {} })
        expect(json.pagination).toEqual({ totalPages: 3 })
      })

      it("includes content separately when content field is returned", async () => {
        const json = await fetchPath({ path: "/api/path", options: {} })
        expect(json.content).toEqual([])
      })
    })
  })

  describe("#deletePath", () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))
    })

    it("sets HTTP method for fetch", async () => {
      const json = await deletePath({ path: "/api/path", options: {} })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "DELETE",
        })
      )
    })

    it("sets recaptcha header if token is provided", async () => {
      const json = await deletePath({
        path: "/api/path",
        options: { recaptchaToken: "token" },
      })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            Accept: "application/vnd.carforyou.v1+json",
            "Content-Type": "application/json",
            "Recaptcha-Token": "token",
          },
        })
      )
    })
  })

  describe("#postData", () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))
    })

    const data = { key: "value" }

    it("sets body and HTTP method for fetch", async () => {
      const json = await postData({
        path: "/api/path",
        body: data,
        options: {},
      })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(data),
        })
      )
    })

    it("sets recaptcha header if token is provided", async () => {
      const json = await postData({
        path: "/api/path",
        body: data,
        options: { recaptchaToken: "token" },
      })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            Accept: "application/vnd.carforyou.v1+json",
            "Content-Type": "application/json",
            "Recaptcha-Token": "token",
          },
        })
      )
    })
  })

  describe("#putData", () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))
    })

    const data = { key: "value" }

    it("sets body and HTTP method for fetch", async () => {
      const json = await putData({ path: "/api/path", body: data, options: {} })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify(data),
        })
      )
    })

    it("sets recaptcha header if token is provided", async () => {
      const json = await putData({
        path: "/api/path",
        body: data,
        options: { recaptchaToken: "token" },
      })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            Accept: "application/vnd.carforyou.v1+json",
            "Content-Type": "application/json",
            "Recaptcha-Token": "token",
          },
        })
      )
    })
  })
})
