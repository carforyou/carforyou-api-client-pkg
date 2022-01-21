import { SimpleSearchListing as SimpleSearchListingFactory } from "./listing"
import { DealerSourceGroup, DealerType } from "../../types/models/index"

import { SimpleSearchListing, UserMessageLead } from "../../index"

export const defaultUserMessageLead: UserMessageLead = {
  createdDate: "2021-11-24T12:04:11.540Z",
  id: 123,
  listing: SimpleSearchListingFactory(),
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
}

export const userMessageLeadFactory = (
  props: Partial<
    Pick<UserMessageLead, "createdDate" | "id"> & {
      listing: Partial<SimpleSearchListing>
    }
  > = { listing: {} }
): UserMessageLead => {
  return {
    ...defaultUserMessageLead,
    ...props,
    listing: SimpleSearchListingFactory(props.listing),
  }
}
