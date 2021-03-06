import {
  DealerSavedSearchFactory,
  defaultDealerSavedSearch,
} from "../dealerSavedSearch"

describe("DealerSavedSearchBuilder", () => {
  it("returns a DealerSavedSearch when no preset is passed", () => {
    const dealerSavedSearch = DealerSavedSearchFactory()
    expect(dealerSavedSearch).toEqual(defaultDealerSavedSearch)
  })

  it("returns a DealerSavedSearch with a preset email", () => {
    const preset = { emails: ["test@mail.com"] }
    const expected = {
      ...defaultDealerSavedSearch,
      ...preset,
    }
    const dealerSavedSearch = DealerSavedSearchFactory(preset)

    expect(dealerSavedSearch).toEqual(expected)
  })

  it("returns a DealerSavedSearch with a preset query parameter", () => {
    const preset = {
      query: { priceFrom: 123 },
    }
    const expectedQuery = {
      ...defaultDealerSavedSearch.query,
      ...preset.query,
    }
    const expected = {
      ...defaultDealerSavedSearch,
      ...preset,
      query: expectedQuery,
    }

    const dealerSavedSearch = DealerSavedSearchFactory(preset)
    expect(dealerSavedSearch).toEqual(expected)
  })

  it("returns a DealerSavedSearch with every property of the preset", () => {
    const preset = {
      createdDate: "2020-06-15T11:23:08.668874Z",
      emails: ["test@test.com"],
      id: "dummy",
      lastModifiedDate: "2020-06-15T11:23:08.668874Z",
      query: {
        makeKey: "Ford",
        modelType: [
          {
            modelKey: "mustang",
            type: "GT 500",
          },
        ],
        bodyType: ["coupe"],
        firstRegistrationYearFrom: 2011,
        firstRegistrationYearTo: 2016,
        mileageFrom: 10000,
        mileageTo: 100000,
        priceFrom: 1,
        priceTo: 10000,
        horsePowerFrom: 160,
        horsePowerTo: 800,
        fuelTypeGroup: ["gasoline"],
        transmissionType: ["manual"],
      },
    }

    const dealerSavedSearch = DealerSavedSearchFactory(preset)
    expect(dealerSavedSearch).toEqual(preset)
  })

  it("converts null values to empty arrays if needed", () => {
    const preset = {
      emails: null,
      query: {
        modelType: null,
        bodyType: null,
        fuelTypeGroup: null,
        transmissionType: null,
      },
    }

    const dealerSavedSearch = DealerSavedSearchFactory(preset)
    const {
      emails,
      query: { modelType, bodyType, fuelTypeGroup, transmissionType },
    } = dealerSavedSearch
    expect(emails).toEqual([])
    expect(modelType).toEqual([])
    expect(bodyType).toEqual([])
    expect(fuelTypeGroup).toEqual([])
    expect(transmissionType).toEqual([])
  })
})
