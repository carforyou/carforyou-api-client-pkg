import PaginatedFactory from "../../../lib/factories/paginated"
import {
  fetchDealerSavedSearch,
  fetchDealerSavedSearches,
  postDealerSavedSearch,
  putDealerSavedSearch,
  deleteDealerSavedSearch,
} from "../autoAlarm"

const savedSearch = (attributes = {}) => ({
  createdDate: "2020-10-10",
  emails: ["test@test.com"],
  id: "qwertyuiop",
  lastModifiedDate: "2020-10-10",
  query: {
    makeKey: "audi",
    modelType: [{ modelKey: "a3", type: "sport" }],
    bodyType: ["saloon"],
    fuelTypeGroup: ["petrol"],
    transmissionType: ["manual"],
    priceTo: 15000,
    firstRegistrationYearTo: 2007,
  },
  ...attributes,
})

describe("Auto alarm", () => {
  beforeEach(fetchMock.resetMocks)

  describe("#fetchDealerSavedSearch", () => {
    it("returns saved search", async () => {
      const dealerSavedSearch = savedSearch()
      fetchMock.mockResponse(JSON.stringify(dealerSavedSearch))

      const data = await fetchDealerSavedSearch({
        dealerId: 123,
        savedSearchId: "qwertyuiop",
        options: { accessToken: "TOKEN" },
      })
      expect(data).toEqual(dealerSavedSearch)
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe("#fetchDealerSavedSearches", () => {
    const { content, pagination } = PaginatedFactory([
      savedSearch({ id: "qwer" }),
      savedSearch({ id: "tyu" }),
      savedSearch({ id: "iop" }),
    ])

    beforeEach(() => {
      fetchMock.mockResponse(
        JSON.stringify({
          content,
          ...pagination,
        })
      )
    })

    it("unwraps content from json", async () => {
      const data = await fetchDealerSavedSearches({
        dealerId: 123,
        options: { accessToken: "TOKEN" },
      })

      expect(data.content).toEqual(content)
    })

    it("unwraps pagination from json", async () => {
      const data = await fetchDealerSavedSearches({
        dealerId: 123,
        options: { accessToken: "TOKEN" },
      })

      expect(data.pagination).toEqual(pagination)
    })

    it("passes query in query string", async () => {
      await fetchDealerSavedSearches({
        dealerId: 123,
        page: 5,
        size: 25,
        options: { accessToken: "TOKEN" },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "/dealers/123/listing-saved-searches/auto-alarms?page=5&size=25"
        ),
        expect.any(Object)
      )
    })
  })

  describe("#postDealerSavedSearch", () => {
    const dealerSavedSearch = savedSearch({ id: null })

    it("saves the saved search", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await postDealerSavedSearch({
        dealerId: 123,
        savedSearch: dealerSavedSearch,
        options: { accessToken: "TOKEN" },
      })
      expect(response).toEqual({ tag: "success", result: dealerSavedSearch })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "/dealers/123/listing-saved-searches/auto-alarms"
        ),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(dealerSavedSearch),
        })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [
        { param: "priceTo", message: "validation.field.not-empty" },
      ]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await postDealerSavedSearch({
        dealerId: 123,
        savedSearch: dealerSavedSearch,
        options: { accessToken: "TOKEN" },
      })
      expect(response).toEqual({ tag: "error", message, errors })
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe("#putDealerSavedSearch", () => {
    const dealerSavedSearch = savedSearch({ id: "test" })

    it("saves the saved search", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await putDealerSavedSearch({
        dealerId: 123,
        savedSearchId: "test",
        savedSearch: dealerSavedSearch,
        options: { accessToken: "TOKEN" },
      })
      expect(response).toEqual({ tag: "success", result: dealerSavedSearch })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "/dealers/123/listing-saved-searches/auto-alarms/test"
        ),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify(dealerSavedSearch),
        })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [
        { param: "priceTo", message: "validation.field.not-empty" },
      ]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await putDealerSavedSearch({
        dealerId: 123,
        savedSearchId: "test",
        savedSearch: dealerSavedSearch,
        options: { accessToken: "TOKEN" },
      })
      expect(response).toEqual({ tag: "error", message, errors })
      expect(fetch).toHaveBeenCalled()
    })
  })

  describe("#deleteDealerSavedSearch", () => {
    it("saves the saved search", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await deleteDealerSavedSearch({
        dealerId: 123,
        savedSearchId: "test",
        options: { accessToken: "TOKEN" },
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "/dealers/123/listing-saved-searches/auto-alarms/test"
        ),
        expect.any(Object)
      )
    })

    it("handles request error", async () => {
      fetchMock.mockResponses([null, { status: 500 }])

      const response = await deleteDealerSavedSearch({
        dealerId: 123,
        savedSearchId: "test",
        options: { accessToken: "TOKEN" },
      })
      expect(response.tag).toEqual("error")
      expect(fetch).toHaveBeenCalled()
    })
  })
})
