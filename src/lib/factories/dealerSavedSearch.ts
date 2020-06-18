import {
  DealerSavedSearch as DealerSavedSearchType,
  AutoAlarmType,
  ModelType,
} from "types/models/autoAlarm"

export interface DealerSavedSearchPreset {
  createdDate?: string | Date
  emails?: string[]
  id?: number | null
  lastModifiedDate?: string | Date
  query?: {
    makeKey?: string
    modelType?: ModelType[]
    bodyType?: string[]
    firstRegistrationYearFrom?: number | null
    firstRegistrationYearTo?: number | null
    mileageFrom?: number | null
    mileageTo?: number | null
    priceFrom?: number | null
    priceTo?: number | null
    horsePowerFrom?: number | null
    horsePowerTo?: number | null
    fuelTypeGroup?: string[]
    transmissionType?: string[]
  }
  type?: AutoAlarmType
}

export const defaultDealerSavedSearch: DealerSavedSearchType = {
  createdDate: new Date(),
  emails: [],
  id: null,
  lastModifiedDate: new Date(),
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
  type: "auto-alarm",
}

export const DealerSavedSearchFactory = (
  preset?: DealerSavedSearchPreset
): DealerSavedSearchType => {
  const presetQuery = preset?.query || {}
  const query = {
    ...defaultDealerSavedSearch.query,
    ...presetQuery,
  }
  return {
    ...defaultDealerSavedSearch,
    ...preset,
    query: query,
  }
}
