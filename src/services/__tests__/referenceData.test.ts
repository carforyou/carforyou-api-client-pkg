import { fetchReferenceData } from "../referenceData"

describe("fetchReferenceData", () => {
  const testData = {
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
    minRegistrationYear: 1990,
    seats: [1, 2, 3],
    doors: [1, 2, 3],
  }

  beforeEach(() => {
    fetchMock.resetMocks
    fetchMock.mockResponse(JSON.stringify(testData))
  })

  it("fetches reference data", async () => {
    const fetched = await fetchReferenceData()

    expect(fetched).toEqual(testData)
    expect(fetch).toHaveBeenCalled()
  })
})
