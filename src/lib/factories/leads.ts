import {
  SearchCallLead as SearchCallLeadType,
  SearchMessageLead as SearchMessageLeadType,
  SearchQuestionLead as SearchQuestionLeadType,
  SearchWhatsappLead as SearchWhatsappLeadType,
} from "../../types/models"

const listing = {
  externalListingId: "1234567",
  referenceId: "123",
  image:
    "2019/09/17/11/13/13/1-aixam-mac-500-cabriolet-480-261485-7e5hF5fhFUiC.jpg",
  make: "Ford",
  mileage: 6000,
  model: "Fiesta",
  price: 20000,
  type: "1.0 EcoB 125 Titanium X",
}

const searchMessageLeadDefaults: SearchMessageLeadType = {
  id: 501,
  listingId: 501,
  listing,
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

const SearchQuestionLeadDefaults: SearchQuestionLeadType = {
  id: 501,
  question: "Hello, can you let me know something about the car ?",
  answer: null,
  answerDate: null,
  listing,
  createdDate: "2022-01-11T05:00Z",
}

const searchCallLeadDefaults: SearchCallLeadType = {
  id: 501,
  listingId: 501,
  listing: {
    ...listing,
    firstRegistrationDate: "2021-03-18",
    id: 555,
  },
  callerNumber: "123-323",
  createdDate: "2021-01-01T12:34:56.000Z",
  duration: 0,
}

const searchWhatsappLeadDefaults: SearchWhatsappLeadType = {
  createdDate: "2021-01-01T12:34:56.000Z",
  firstName: "Birra",
  id: 501,
  lastName: "Peroni",
  listing: { ...listing, id: 555 },
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

export const SearchQuestionLead = (
  attributes = {}
): SearchQuestionLeadType => ({
  ...SearchQuestionLeadDefaults,
  ...attributes,
})

export const SearchWhatsappLead = (
  attributes: Partial<SearchWhatsappLeadType> = {}
): SearchWhatsappLeadType => ({
  ...searchWhatsappLeadDefaults,
  ...attributes,
})
