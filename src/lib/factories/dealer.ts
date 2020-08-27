import { SearchDealer } from "../../types/models/dealer"

export function DealerPromotion(): SearchDealer {
  return {
    id: 0,
    location: {
      address: "string",
      city: "string",
      zipCode: "string",
    },
    name: "string",
    promotion: {
      image: "string",
      logo: "string",
      title: "string",
    },
  }
}
