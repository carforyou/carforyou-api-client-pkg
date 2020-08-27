import { SearchDealer } from "../../types/models/dealer"

export function DealerPromotion(): SearchDealer {
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
  }
}
