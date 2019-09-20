import apiClient from "../apiClient"
import { resolveServiceUrl, Service } from "../base"

describe("Base", () => {
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
})
