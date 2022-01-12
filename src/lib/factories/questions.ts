import { SearchQuestionLead as SearchQuestionLeadType } from "../../types/models"

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

const SearchQuestionLeadDefaults: SearchQuestionLeadType = {
  id: 501,
  question: "Hello, can you let me know something about the car ?",
  answer: null,
  answerDate: null,
  listing,
  createdDate: "2021-01-11T05:00Z",
}

export const SearchQuestionLead = (
  attributes = {}
): SearchQuestionLeadType => ({
  ...SearchQuestionLeadDefaults,
  ...attributes,
})
