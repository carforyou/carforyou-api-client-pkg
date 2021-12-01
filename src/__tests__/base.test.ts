import fetchMock from "jest-fetch-mock"

import { deletePath, fetchPath, getHost, postData, putData } from "../base"
import apiClient from "../apiClient"

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

    it("allows overriding the version header", async () => {
      const json = await fetchPath({
        path: "/api/path",
        options: { apiVersion: "v2" },
      })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        method: "GET",
        headers: expect.objectContaining({
          Accept: `application/vnd.carforyou.v2+json`,
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
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Foo: "bar",
          }),
        })
      )
    })

    describe("access token handling", () => {
      it("does not throw and error when the request is not marked as authorized", async () => {
        const response = await fetchPath({
          path: "api/path",
          options: {},
        })
        expect(response).toEqual({ ok: true })
      })

      it("does the access token as a header when the request is not marked as authorized", async () => {
        await fetchPath({
          path: "api/path",
          options: {
            accessToken: "GIMME ACCESS!",
          },
        })
        expect(fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            headers: expect.objectContaining({
              Authorization: "Bearer GIMME ACCESS!",
            }),
          })
        )
      })

      it("adds the token as a Authorization header to an authenticated request", async () => {
        await fetchPath({
          path: "api/path",
          options: {
            isAuthorizedRequest: true,
            accessToken: "GIMME ACCESS!",
          },
        })

        expect(fetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            headers: expect.objectContaining({
              Authorization: "Bearer GIMME ACCESS!",
            }),
          })
        )
      })

      it("throws an error if the token is not passed for an authenticated request", async () => {
        return fetchPath({
          path: "api/path",
          options: {
            isAuthorizedRequest: true,
          },
        }).catch((error) => {
          expect(error.message).toEqual(
            "You tried to make an authenticated requests without providing an access token!\n Please pass a valid token as a request option."
          )
        })
      })
    })

    it("passes fetch options to fetch", async () => {
      const json = await fetchPath({
        path: "/api/path",
        options: { mode: "no-cors" },
      })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          mode: "no-cors",
        })
      )
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
  })
})
