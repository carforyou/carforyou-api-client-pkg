import apiClient from "../apiClient"
import { resolveServiceUrl, Service, fetchPath } from "../base"

describe("Base", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe("#resolveServiceUrl", () => {
    describe("when service is not configured", () => {
      it("raises an error", () => {
        expect(() => resolveServiceUrl(Service.CAR)).toThrowError(
          'Missing endpoint configuration for "CAR" service'
        )
      })
    })

    describe("when service is configured", () => {
      beforeEach(() => {
        apiClient.configure({
          carServiceUrl: "car.test",
          catalogueServiceUrl: "catalogue.test",
          searchServiceUrl: "search.test",
          dealerServiceUrl: "dealer.test"
        })
      })

      Object.keys(Service).forEach(service => {
        it(`returns url for service: ${service}`, () => {
          expect(resolveServiceUrl(Service[service])).toEqual(
            `${service.toLowerCase()}.test`
          )
        })
      })
    })
  })

  describe("#fetchPath", () => {
    beforeEach(() => {
      apiClient.configure({
        carServiceUrl: "car.test",
        catalogueServiceUrl: "catalogue.test",
        searchServiceUrl: "search.test",
        dealerServiceUrl: "dealer.test"
      })

      fetchMock.mockResponse(JSON.stringify({ ok: true }))
    })

    it("strips leading '/' from path", async () => {
      const json = await fetchPath(Service.CAR, "/api/path")

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/path"),
        expect.any(Object)
      )
    })

    it("inserts correct version header", async () => {
      const json = await fetchPath(Service.CAR, "api/path")

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        headers: expect.objectContaining({
          Accept: `application/vnd.carforyou.v1+json`
        })
      })
    })

    it("allows setting custom headers", async () => {
      const json = await fetchPath(Service.CAR, "api/path", {
        headers: { Foo: "bar" }
      })

      expect(json).toEqual({ ok: true })
      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        headers: expect.objectContaining({
          Foo: "bar"
        })
      })
    })

    describe("without pagination", () => {
      beforeEach(() => {
        fetchMock.mockResponse(JSON.stringify([]))
      })

      it("includes content", async () => {
        const json = await fetchPath(Service.CAR, "/api/path")
        expect(json).toEqual([])
      })
    })

    describe("with pagination", () => {
      beforeEach(() => {
        fetchMock.mockResponse(JSON.stringify({ content: [], totalPages: 3 }))
      })

      it("includes pagination separately when content field is returned", async () => {
        const json = await fetchPath(Service.CAR, "/api/path")
        expect(json.pagination).toEqual({ totalPages: 3 })
      })

      it("includes content separately when content field is returned", async () => {
        const json = await fetchPath(Service.CAR, "/api/path")
        expect(json.content).toEqual([])
      })
    })
  })
})
