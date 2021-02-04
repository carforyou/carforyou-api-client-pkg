import { MessageLeadsListItem as MessageLeadsListItemType } from "../../types/models"

const leadListItemDefaults: MessageLeadsListItemType = {
  id: 501,
  listingId: 501,
  listing: {
    externalListingId: "1234567",
    make: "Ford",
    model: "Fiesta",
    type: "1.0 EcoB 125 Titanium X",
  },
  phone: "0792222222",
  email: "person@email.com",
  firstName: "Birra",
  lastName: "Peroni",
  createdDate: "2021-01-01T12:34:56.000Z",
  message:
    "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X.",
}

export const LeadListItem = (attributes = {}): MessageLeadsListItemType => ({
  ...leadListItemDefaults,
  ...attributes,
})
