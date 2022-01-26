import { SearchDealer as SearchDealerType } from "../../types/models/dealer"

export function SearchDealer(attributes = {}): SearchDealerType {
  return {
    id: 0,
    location: {
      address: "Badenerstrasse 8",
      city: "Zurich",
      zipCode: "8008",
    },
    name: "Emil Frey",
    ...attributes,
  }
}
