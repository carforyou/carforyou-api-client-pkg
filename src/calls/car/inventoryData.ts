import { fetchPath, Service } from "../../base"

export const fetchBodyTypes: () => Promise<string[]> = () => {
  return fetchPath(Service.CAR, "inventory/bodytypes")
}

export const fetchColorGroups: () => Promise<string[]> = () => {
  return fetchPath(Service.CAR, "inventory/colorgroups")
}

export const fetchColors: () => Promise<string[]> = () => {
  return fetchPath(Service.CAR, "inventory/colors")
}

export const fetchConditionTypes: () => Promise<string[]> = () => {
  return fetchPath(Service.CAR, "inventory/conditiontypes")
}

export const fetchDoors: () => Promise<number[]> = () => {
  return fetchPath(Service.CAR, "inventory/doors")
}

export const fetchDriveTypes: () => Promise<string[]> = () => {
  return fetchPath(Service.CAR, "inventory/drivetypes")
}

export const fetchFuelTypeGroups: () => Promise<string[]> = () => {
  return fetchPath(Service.CAR, "inventory/fueltypegroups")
}

export const fetchFuelTypes: () => Promise<string[]> = () => {
  return fetchPath(Service.CAR, "inventory/fueltypes")
}

export const fetchMinFirstRegistrationYear: () => Promise<number> = () => {
  return fetchPath(Service.CAR, "inventory/min-first-registration-year")
}

export const fetchOptions: () => Promise<string[]> = () => {
  return fetchPath(Service.CAR, "inventory/options")
}

export const fetchSeats: () => Promise<number[]> = () => {
  return fetchPath(Service.CAR, "inventory/seats")
}

export const fetchTransmissionTypes: () => Promise<string[]> = () => {
  return fetchPath(Service.CAR, "inventory/transmissiontypes")
}

