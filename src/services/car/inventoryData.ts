import { ApiCallOptions, fetchPath } from "../../base"

export const fetchBodyTypes = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/bodytypes", options })
}

export const fetchColorGroups = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/colorgroups", options })
}

export const fetchColors = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/colors", options })
}

export const fetchConditionTypes = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/conditiontypes", options })
}

export const fetchDoors = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<number[]> => {
  return fetchPath({ path: "inventory/doors", options })
}

export const fetchDriveTypes = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/drivetypes", options })
}

export const fetchFuelTypeGroups = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/fueltypegroups", options })
}

export const fetchFuelTypes = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/fueltypes", options })
}

export const fetchMinFirstRegistrationYear = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<number> => {
  return fetchPath({ path: "inventory/min-first-registration-year", options })
}

export const fetchOptions = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/options", options })
}

export const fetchSeats = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<number[]> => {
  return fetchPath({ path: "inventory/seats", options })
}

export const fetchTransmissionTypes = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/transmissiontypes", options })
}

export const fetchImagesCountGroups = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/images-count-groups", options })
}

export const fetchFirstPublishingDateAgeGroups = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({
    path: "inventory/first-publishing-date-age-groups",
    options,
  })
}

export const fetchLastPriceModifiedDateAgeGroups = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<string[]> => {
  return fetchPath({
    path: "inventory/last-price-modified-date-age-groups",
    options,
  })
}
