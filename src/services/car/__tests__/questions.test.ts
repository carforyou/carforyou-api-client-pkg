import * as queryStringHelper from "./../../../lib/toQueryString"
import {
  fetchDealerQuestionLeads,
  fetchListingQuestions,
  saveAnswerToQuestion,
} from "../questions"

describe("questions", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    jest.clearAllMocks()
  })

  describe("#fetchListingQuestions", () => {
    it("fetches the listing questions", async () => {
      await fetchListingQuestions({ listingId: 12 })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/listings\/12\/questions\?page=0&size=2&sort=auditMetadata.createdDate%2Cdesc/
        ),
        expect.any(Object)
      )
    })

    it("uses the correct default values for pagination and sort", async () => {
      jest.spyOn(queryStringHelper, "default")
      await fetchListingQuestions({ listingId: 12 })

      expect(queryStringHelper.default).toHaveBeenCalledWith({
        page: 0,
        size: 2,
        sort: "auditMetadata.createdDate,desc",
      })
    })

    it("allows to configure the pagination", async () => {
      jest.spyOn(queryStringHelper, "default")
      await fetchListingQuestions({
        listingId: 12,
        query: { page: 3, size: 10 },
      })

      expect(queryStringHelper.default).toHaveBeenCalledWith({
        page: 2,
        size: 10,
        sort: "auditMetadata.createdDate,desc",
      })
    })
  })

  describe("#fetchDealerQuestionLeads", () => {
    it("fetches the listing questions for a dealer", async () => {
      await fetchDealerQuestionLeads({
        dealerId: 1234,
        options: { accessToken: "some token" },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/dealers\/1234\/listings\/questions\?page=0&size=10&sort=auditMetadata.createdDate%2Cdesc/
        ),
        expect.any(Object)
      )
    })
  })

  describe("#saveAnswerToQuestion", () => {
    it("updates the question", async () => {
      await saveAnswerToQuestion({
        dealerId: 1234,
        listingId: 12,
        questionId: 1,
        answer: { answer: "Diese hat Klima, ja" },
        options: { accessToken: "some token" },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/dealers\/1234\/listings\/12\/questions\/1\/answer/
        ),
        expect.any(Object)
      )
    })
  })
})
