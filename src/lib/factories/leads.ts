import {
  SearchCallLead as SearchCallLeadType,
  SearchMessageLead as SearchMessageLeadType,
  SearchWhatsAppLead as SearchWhatsAppLeadType,
} from "../../types/models"

const searchMessageLeadDefaults: SearchMessageLeadType = {
  id: 501,
  listingId: 501,
  listing: {
    externalListingId: "1234567",
    referenceId: "123",
    image:
      "2019/09/17/11/13/13/1-aixam-mac-500-cabriolet-480-261485-7e5hF5fhFUiC.jpg",
    make: "Ford",
    mileage: 6000,
    model: "Fiesta",
    price: 20000,
    type: "1.0 EcoB 125 Titanium X",
  },
  phone: "0792222222",
  email: "person@email.com",
  firstName: "Birra",
  lastName: "Peroni",
  createdDate: "2021-01-01T12:34:56.000Z",
  message:
    "Grüezi, Ich interessiere mich für Ihr Inserat Ford, Fiesta 1.0 EcoB 125 Titanium X.",
  testDrive: {
    requested: true,
    proposedDate: "2021-02-05",
  },
  videoCallPreference: {
    available: true,
    services: ["Whatsapp", "Facetime"],
  },
}

const searchCallLeadDefaults: SearchCallLeadType = {
  id: 501,
  listingId: 501,
  listing: {
    externalListingId: "1234567",
    referenceId: "123",
    firstRegistrationDate: "2021-03-18",
    id: 555,
    image:
      "2019/09/17/11/13/13/1-aixam-mac-500-cabriolet-480-261485-7e5hF5fhFUiC.jpg",
    make: "Ford",
    mileage: 6000,
    model: "Fiesta",
    price: 20000,
    type: "1.0 EcoB 125 Titanium X",
  },
  callerNumber: "123-323",
  createdDate: "2021-01-01T12:34:56.000Z",
  duration: 0,
}

const searchWhatsAppLeadDefaults: SearchWhatsAppLeadType = {
  createdDate: "2021-01-01T12:34:56.000Z",
  firstName: "Birra",
  id: 501,
  lastName: "Peroni",
  listing: {
    externalListingId: "1234567",
    image:
      "2019/09/17/11/13/13/1-aixam-mac-500-cabriolet-480-261485-7e5hF5fhFUiC.jpg",
    id: 555,
    make: "Ford",
    mileage: 6000,
    model: "Fiesta",
    price: 20000,
    referenceId: "123",
    type: "1.0 EcoB 125 Titanium X",
  },
  listingId: 501,
  phone: "0792222222",
}

export const SearchMessageLead = (attributes = {}): SearchMessageLeadType => ({
  ...searchMessageLeadDefaults,
  ...attributes,
})

export const SearchCallLead = (attributes = {}): SearchCallLeadType => ({
  ...searchCallLeadDefaults,
  ...attributes,
})

export const SearchWhatsAppLead = (
  attributes = {}
): SearchWhatsAppLeadType => ({
  ...searchWhatsAppLeadDefaults,
  ...attributes,
})
