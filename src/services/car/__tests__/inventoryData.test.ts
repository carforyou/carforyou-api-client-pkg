import {
  fetchDoors,
  fetchMinFirstRegistrationYear,
  fetchOptions,
  fetchSeats,
} from "../inventoryData"

describe("CAR service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("inventory data", () => {
    const tests = [
      { name: "fetchDoors", fetchFunction: fetchDoors, response: [1, 2, 3] },
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
        name: "fetchReferenceData",
        fetchFunction: fetchSeats,
        response: {
          bodyTypes: ["bus"],
          colorGroups: ["black"],
          colors: ["anthracite"],
          conditionTypes: ["demonstration"],
          driveTypes: ["all"],
          firstPublishingDateAgeGroups: ["group-0-60"],
          fuelTypeGroups: ["diesel"],
          fuelTypes: ["diesel"],
          imageCountGroups: ["group-0"],
          lastPriceModifiedDateAgeGroups: ["group-0-60"],
          lifestyleTypes: ["city"],
          searchAttributes: ["360-camera"],
          sourceGroups: ["imported"],
          transmissionTypes: ["automatic"],
          vehicleClasses: ["executive"],
        },
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
