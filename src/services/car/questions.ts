import { Paginated } from "../../types/pagination"
import { PaginatedFactory, WithValidationError } from "../../index"
import {
  ApiCallOptions,
  fetchPath,
  handleValidationError,
  postData,
} from "../../base"

export interface Question {
  id: string
  question: string
  createdDate: Date
  answer: string
  answerDate: Date
}

const mockQuestions: Question[] = [
  {
    id: "123",
    question: "When was the last service?",
    createdDate: new Date("2022-01-07"),
    answer: "We will do another service before you pick up the vehicle",
    answerDate: new Date("2022-01-11"),
  },
  {
    id: "1234567",
    question:
      "What is the color of the car? I'm now just adding text to make the question longer to see how that looks like on the UI. Don't mind this part of the question please.",
    createdDate: new Date("2022-01-07"),
    answer:
      "The car is red my friend. I'm now just adding text to make the question longer to see how that looks like on the UI. Don't mind this part of the question please. WUHUUUUUUUU!!!",
    answerDate: new Date("2022-01-09"),
  },
  {
    id: "1234568",
    question: "Where do you live?",
    createdDate: new Date("2022-01-07"),
    answer: "I live in Geneva",
    answerDate: new Date("2022-01-09"),
  },
  {
    id: "1234569",
    question: "Why can I not travel to Australia?",
    createdDate: new Date("2022-01-07"),
    answer: "Because you are not vaccinated",
    answerDate: new Date("2022-01-09"),
  },
  {
    id: "1234561",
    question: "Can I win now since Djokovic is not here?",
    createdDate: new Date("2022-01-07"),
    answer: "I don't know, we will see",
    answerDate: new Date("2022-01-09"),
  },
]

export const fetchListingQuestions = async ({
  listingId,
  options = {},
}: {
  listingId: number
  options?: ApiCallOptions
}): Promise<Paginated<Question>> => {
  return Promise.resolve(PaginatedFactory(mockQuestions))
  /*return fetchPath({
    path: `listings/${listingId}/questions`,
    options: options,
  })*/
}

export const createQuestion = async ({
  listingId,
  question,
  options = {},
}: {
  listingId: number
  question: { question: string }
  options?: ApiCallOptions
}): Promise<WithValidationError<Question>> => {
  try {
    const response = await postData({
      path: `listings/${listingId}/questions`,
      body: question,
      options,
    })
    return {
      tag: "success",
      result: response,
    }
  } catch (error) {
    return handleValidationError(error)
  }
}
