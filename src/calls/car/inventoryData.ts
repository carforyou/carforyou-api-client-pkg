import { fetchPath, Service } from "../../base"

export const fetchBodyTypes: () => Promise<string[]> = () => {
  return fetchPath(Service.CAR, "inventory/bodytypes")
}
