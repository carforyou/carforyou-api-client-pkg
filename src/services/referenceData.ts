import { ApiCallOptions, fetchPath } from "../base"

export const fetchReferenceData = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<{
  bodyTypes: string[]
  conditionTypes: string[]
  fuelTypes: string[]
  fuelTypeGroups: string[]
  transmissionTypes: string[]
  driveTypes: string[]
  colors: string[]
  colorGroups: string[]
  searchAttributes: string[]
  lifestyleTypes: string[]
  vehicleClasses: string[]
  imagesCountGroups: string[]
  sourceGroups: string[]
  lastPriceModifiedDateAgeGroups: string[]
  firstPublishingDateAgeGroups: string[]
}> => {
  return fetchPath({ path: "reference-data", options })
}
