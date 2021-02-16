import { SearchMessageLead as SearchMessageLeadType } from "../../types/models"

const searchMessageLeadDefaults: SearchMessageLeadType = {
  id: 501,
  listingId: 501,
  listing: {
    externalListingId: "1234567",
    image:
      "2019/09/17/11/13/13/1-aixam-mac-500-cabriolet-480-261485-7e5hF5fhFUiC.jpg",
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

export const SearchMessageLead = (attributes = {}): SearchMessageLeadType => ({
  ...searchMessageLeadDefaults,
  ...attributes,
})
