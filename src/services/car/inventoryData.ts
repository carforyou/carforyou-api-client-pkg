import { fetchPath, RequestOptions } from "../../base"

export const fetchBodyTypes = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/bodytypes", options })
}

export const fetchColorGroups = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/colorgroups", options })
}

export const fetchColors = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/colors", options })
}

export const fetchConditionTypes = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/conditiontypes", options })
}

export const fetchDoors = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<number[]> => {
  return fetchPath({ path: "inventory/doors", options })
}

export const fetchDriveTypes = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/drivetypes", options })
}

export const fetchFuelTypeGroups = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/fueltypegroups", options })
}

export const fetchFuelTypes = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/fueltypes", options })
}

export const fetchMinFirstRegistrationYear = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<number> => {
  return fetchPath({ path: "inventory/min-first-registration-year", options })
}

export const fetchOptions = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/options", options })
}

export const fetchSeats = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<number[]> => {
  return fetchPath({ path: "inventory/seats", options })
}

export const fetchTransmissionTypes = ({
  options = {},
}: { options?: RequestOptions } = {}): Promise<string[]> => {
  return fetchPath({ path: "inventory/transmissiontypes", options })
}
