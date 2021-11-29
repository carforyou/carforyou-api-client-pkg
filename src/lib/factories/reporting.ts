import { DealerSourceGroup, DealerType } from "../../types/models/index"

import { UserMessageLead, UserMessageLeadListing } from "../../index"

export const defaultUserMessageLead: UserMessageLead = {
  createdDate: "2021-11-24T12:04:11.540Z",
  id: 123,
  listing: {
    id: 1002,
    make: "Audi",
    model: "A3",
    type: "1.8 TFSI",
    firstRegistrationDate: "2019-10-01",
    firstRegistrationYear: 2019,
    mileage: 45000,
    transmissionType: "automatic",
    fuelType: "diesel",
    price: 22000,
    buyNowEligible: true,
    verified: true,
    hasBuyerProtection: false,
    leasingMonthlyRate: 220.55,
    gbdScore: "good-deal",
    image: "image2.jpg",
    dealer: {
      id: 502,
      name: "Dealer name 2",
      location: {
        zipCode: "8000",
        city: "Zurich",
      },
      dealerSourceGroup: DealerSourceGroup.carforyou,
      dealerType: DealerType.private,
    },
  },
}

export const userMessageLeadFactory = (
  props: Partial<
    Pick<UserMessageLead, "createdDate" | "id"> & {
      listing: Partial<UserMessageLeadListing>
    }
  > = { listing: {} }
): UserMessageLead => {
  return {
    ...defaultUserMessageLead,
    ...props,
    listing: { ...defaultUserMessageLead.listing, ...props.listing },
  }
}
