import { SearchQuestionLead as SearchQuestionLeadType } from "../../types/models"
import { PartialSearchListing } from "./listing"

const SearchQuestionLeadDefaults: SearchQuestionLeadType = {
  id: 501,
  listingId: 101,
  question: "Hello, can you let me know something about the car ?",
  answer: null,
  answerDate: null,
  listing: PartialSearchListing(),
  createdDate: "2021-01-11T05:00Z",
}

export const SearchQuestionLead = (
  attributes = {}
): SearchQuestionLeadType => ({
  ...SearchQuestionLeadDefaults,
  ...attributes,
})
