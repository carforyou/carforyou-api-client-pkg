import { ApiCallOptions, fetchPath } from "../../base"

export const fetchDoors = ({
  options = {},
}: { options?: ApiCallOptions } = {}): Promise<number[]> => {
  return fetchPath({ path: "inventory/doors", options })
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
