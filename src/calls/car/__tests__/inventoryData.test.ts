import apiClient from "../../../apiClient"
import { fetchBodyTypes } from "../inventoryData"

describe("CAR service", () => {
  beforeEach(() => {
    fetchMock.resetMocks()

    apiClient.configure({
      carServiceUrl: "car.test"
    })
  })

  describe("Catalogue API", () => {
    describe("inventory data", () => {
      describe("fetchBodyTypes", () => {
        const bodyTypes = ["coupe", "cabrio", "suv"]

        beforeEach(() => {
          fetchMock.mockResponse(JSON.stringify(bodyTypes))
        })

        it("returns makes", async () => {
          const fetchedBodyTypes = await fetchBodyTypes()

          expect(fetchedBodyTypes).toEqual(bodyTypes)
          expect(fetch).toHaveBeenCalled()
        })
      })
    })
  })
})
