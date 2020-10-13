import { fetchPath, Service } from "../../base"

export const fetchBodyTypes = (): Promise<string[]> => {
  return fetchPath({ service: Service.CAR, path: "inventory/bodytypes" })
}

export const fetchColorGroups = (): Promise<string[]> => {
  return fetchPath({ service: Service.CAR, path: "inventory/colorgroups" })
}

export const fetchColors = (): Promise<string[]> => {
  return fetchPath({ service: Service.CAR, path: "inventory/colors" })
}

export const fetchConditionTypes = (): Promise<string[]> => {
  return fetchPath({ service: Service.CAR, path: "inventory/conditiontypes" })
}

export const fetchDoors = (): Promise<number[]> => {
  return fetchPath({ service: Service.CAR, path: "inventory/doors" })
}

export const fetchDriveTypes = (): Promise<string[]> => {
  return fetchPath({ service: Service.CAR, path: "inventory/drivetypes" })
}

export const fetchFuelTypeGroups = (): Promise<string[]> => {
  return fetchPath({ service: Service.CAR, path: "inventory/fueltypegroups" })
}

export const fetchFuelTypes = (): Promise<string[]> => {
  return fetchPath({ service: Service.CAR, path: "inventory/fueltypes" })
}

export const fetchMinFirstRegistrationYear = (): Promise<number> => {
  return fetchPath({
    service: Service.CAR,
    path: "inventory/min-first-registration-year",
  })
}

export const fetchOptions = (): Promise<string[]> => {
  return fetchPath({ service: Service.CAR, path: "inventory/options" })
}

export const fetchSeats = (): Promise<number[]> => {
  return fetchPath({ service: Service.CAR, path: "inventory/seats" })
}

export const fetchTransmissionTypes = (): Promise<string[]> => {
  return fetchPath({
    service: Service.CAR,
    path: "inventory/transmissiontypes",
  })
}
