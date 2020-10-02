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
  fetchTransmissionTypes,
} from "../inventoryData"

describe("CAR service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("Catalogue API", () => {
    describe("inventory data", () => {
      const tests = [
        {
          name: "fetchBodyTypes",
          fetchFunction: fetchBodyTypes,
          response: ["coupe", "cabrio", "suv"],
        },
        {
          name: "fetchColorGroups",
          fetchFunction: fetchColorGroups,
          response: ["black", "red"],
        },
        {
          name: "fetchColors",
          fetchFunction: fetchColors,
          response: ["black", "orange", "red"],
        },
        {
          name: "fetchConditionTypes",
          fetchFunction: fetchConditionTypes,
          response: ["new", "used"],
        },
        { name: "fetchDoors", fetchFunction: fetchDoors, response: [1, 2, 3] },
        {
          name: "fetchDriveTypes",
          fetchFunction: fetchDriveTypes,
          response: ["rear", "front"],
        },
        {
          name: "fetchFuelTypeGroups",
          fetchFunction: fetchFuelTypeGroups,
          response: ["petrol", "diesel", "hybrid"],
        },
        {
          name: "fetchFuelTypes",
          fetchFunction: fetchFuelTypes,
          response: ["petrol", "diesel", "gas-petrol"],
        },
        {
          name: "fetchMinFirstRegistrationYear",
          fetchFunction: fetchMinFirstRegistrationYear,
          response: 1939,
        },
        {
          name: "fetchOptions",
          fetchFunction: fetchOptions,
          response: ["navigation", "air-condition", "leather", "sunroof"],
        },
        {
          name: "fetchSeats",
          fetchFunction: fetchSeats,
          response: [2, 4, 5, 7],
        },
        {
          name: "fetchTransmissionTypes",
          fetchFunction: fetchTransmissionTypes,
          response: ["manual", "automatic"],
        },
      ]

      tests.forEach(({ name, fetchFunction, response }) => {
        describe(`${name} fetches data`, () => {
          beforeEach(() => {
            fetchMock.mockResponse(JSON.stringify(response))
          })

          it("returns data", async () => {
            const fetched = await fetchFunction()

            expect(fetched).toEqual(response)
            expect(fetch).toHaveBeenCalled()
          })
        })
      })
    })
  })
})
