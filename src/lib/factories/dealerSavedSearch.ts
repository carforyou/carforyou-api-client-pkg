import {
  DealerSavedSearch as DealerSavedSearchType,
  AutoAlarmType,
  ModelType,
} from "../../types/models/autoAlarm"

export interface DealerSavedSearchPreset {
  createdDate?: string | null
  emails?: string[]
  id?: string | null
  lastModifiedDate?: string | null
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
  type: "auto-alarm",
}

export const DealerSavedSearchFactory = (
  preset?: DealerSavedSearchPreset
): DealerSavedSearchType => {
  const presetQuery = (preset && preset.query) || {}
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
