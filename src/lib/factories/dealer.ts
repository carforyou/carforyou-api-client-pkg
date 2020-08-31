import { SearchDealer } from "../../types/models/dealerPromotion"

export function DealerPromotion(attributes = {}): SearchDealer {
  return {
    id: 0,
    location: {
      address: "Badenerstrasse 8",
      city: "Zurich",
      zipCode: "8008",
    },
    name: "Emil Frey",
    promotion: {
      image: "http://carforyou.ch/imageURL",
      logo: "http://carforyou.ch/logoURL",
      title: "Emil frey photo",
    },
    ...attributes,
  }
}
