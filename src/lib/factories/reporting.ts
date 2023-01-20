import { DealerSourceGroup, DealerType } from "../../types/models/index"

import { PartialSearchListing, UserMessageLead } from "../../index"
import { PartialSearchListing as PartialSearchListingFactory } from "./listing"

export const defaultUserMessageLead: UserMessageLead = {
  createdDate: "2021-11-24T12:04:11.540Z",
  id: 123,
  listing: PartialSearchListingFactory(),
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
      listing: Partial<PartialSearchListing>
    }
  > = { listing: {} }
): UserMessageLead => {
  return {
    ...defaultUserMessageLead,
    ...props,
    listing: PartialSearchListingFactory(props.listing),
  }
}
