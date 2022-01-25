import { PartialSearchListing } from "./listing"
import {
  SearchCallLead as SearchCallLeadType,
  SearchMessageLead as SearchMessageLeadType,
  SearchWhatsappLead as SearchWhatsappLeadType,
} from "../../types/models"

const searchMessageLeadDefaults: SearchMessageLeadType = {
  id: 501,
  listingId: 501,
  listing: PartialSearchListing(),
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
  listing: PartialSearchListing({
    firstRegistrationDate: "2021-03-18",
    id: 555,
  }),
  callerNumber: "123-323",
  createdDate: "2021-01-01T12:34:56.000Z",
  duration: 0,
}

const searchWhatsappLeadDefaults: SearchWhatsappLeadType = {
  createdDate: "2021-01-01T12:34:56.000Z",
  firstName: "Birra",
  id: 501,
  lastName: "Peroni",
  listing: PartialSearchListing({ id: 555 }),
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

export const SearchWhatsappLead = (
  attributes: Partial<SearchWhatsappLeadType> = {}
): SearchWhatsappLeadType => ({
  ...searchWhatsappLeadDefaults,
  ...attributes,
})
