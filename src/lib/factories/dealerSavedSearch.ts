import {
  DealerSavedSearch,
  DealerSavedSearchQuery,
  AutoAlarmType,
} from "../../types/models/autoAlarm"

type NestedPartial<T> = {
  [P in keyof T]?: Partial<T[P]>
}

export const defaultDealerSavedSearch: DealerSavedSearch = {
  createdDate: null,
  emails: [],
  id: null,
  lastModifiedDate: null,
  query: {
    makeKey: "",
    modelType: [],
    bodyType: [],
    firstRegistrationYearFrom: null,
    firstRegistrationYearTo: null,
    mileageFrom: null,
    mileageTo: null,
    priceFrom: null,
    priceTo: null,
    horsePowerFrom: null,
    horsePowerTo: null,
    fuelTypeGroup: [],
    transmissionType: [],
  },
  type: "auto-alarm" as AutoAlarmType,
}

export const DealerSavedSearchFactory = (
  preset: NestedPartial<DealerSavedSearch> = {}
): DealerSavedSearch => {
  const presetQuery = preset.query || {}
  const { query: defaultQuery } = defaultDealerSavedSearch
  const query: DealerSavedSearchQuery = {
    ...defaultQuery,
    ...presetQuery,
  }
  return {
    ...defaultDealerSavedSearch,
    ...preset,
    query: query,
  }
}
