import { UserMessageLead, UserMessageLeadListing } from "../../index"

export const defaultUserMessageLead: UserMessageLead = {
  createdDate: "2021-11-24T12:04:11.540Z",
  id: 123,
  listing: {
    externalListingId: "999",
    image: "s3:/fake-image",
    make: "Ford",
    mileage: 20000,
    model: "Mustang",
    price: 30000,
    referenceId: "ABCFEDG",
    type: "GT",
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
