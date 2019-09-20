import apiClient from "../../../apiClient"
import {
  fetchBodyTypes,
  fetchColorGroups,
  fetchColors,
  fetchConditionTypes,
  fetchDoors,
  fetchDriveTypes,
  fetchFuelTypeGroups,
  fetchFuelTypes,
  fetchMinFirstRegistrationYear,
  fetchOptions,
  fetchSeats,
  fetchTransmissionTypes
} from "../inventoryData"

describe("CAR service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("Catalogue API", () => {
    describe("inventory data", () => {
      const tests = [
        {
          name: "fetchBodyTypes",
          fn: fetchBodyTypes,
          response: ["coupe", "cabrio", "suv"]
        },
        {
          name: "fetchColorGroups",
          fn: fetchColorGroups,
          response: ["black", "red"]
        },
        {
          name: "fetchColors",
          fn: fetchColors,
          response: ["black", "orange", "red"]
        },
        {
          name: "fetchConditionTypes",
          fn: fetchConditionTypes,
          response: ["new", "used"]
        },
        { name: "fetchDoors", fn: fetchDoors, response: [1, 2, 3] },
        {
          name: "fetchDriveTypes",
          fn: fetchDriveTypes,
          response: ["rear", "front"]
        },
        {
          name: "fetchFuelTypeGroups",
          fn: fetchFuelTypeGroups,
          response: ["petrol", "diesel", "hybrid"]
        },
        {
          name: "fetchFuelTypes",
          fn: fetchFuelTypes,
          response: ["petrol", "diesel", "gas-petrol"]
        },
        {
          name: "fetchMinFirstRegistrationYear",
          fn: fetchMinFirstRegistrationYear,
          response: 1939
        },
        {
          name: "fetchOptions",
          fn: fetchOptions,
          response: ["navigation", "air-condition", "leather", "sunroof"]
        },
        { name: "fetchSeats", fn: fetchSeats, response: [2, 4, 5, 7] },
        {
          name: "fetchTransmissionTypes",
          fn: fetchTransmissionTypes,
          response: ["manual", "automatic"]
        }
      ]

      tests.forEach(({ name, fn, response }) => {
        describe(name, () => {
          beforeEach(() => {
            fetchMock.mockResponse(JSON.stringify(response))
          })

          it("returns data", async () => {
            const fetched = await fn()

            expect(fetched).toEqual(response)
            expect(fetch).toHaveBeenCalled()
          })
        })
      })
    })
  })
})
