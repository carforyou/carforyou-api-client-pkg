import {
  DealerSavedSearchFactory,
  defaultDealerSavedSearch,
} from "../dealerSavedSearch"
import { AutoAlarmType } from "types/models/autoAlarm"

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
      type: "auto-alarm" as AutoAlarmType,
    }

    const dealerSavedSearch = DealerSavedSearchFactory(preset)
    expect(dealerSavedSearch).toEqual(preset)
  })
})
