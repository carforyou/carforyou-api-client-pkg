import {
  deleteSavedSearch,
  enableSavedSearch,
  extendSavedSearch,
  fetchSavedSearch,
  sendSavedSearch,
  sendSavedSearchFeedback,
} from "../userNotification"

describe("USER_NOTIFICATION service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("sendSavedSearch", () => {
    beforeEach(() => {
      fetchMock.mockResponse("")
    })

    it("calls endpoint", async () => {
      await sendSavedSearch({
        savedSearch: {
          email: "save@thesear.ch",
          language: "de",
          uiMetadata: {
            searchPath: "?makeKeys=bmw",
          },
          searchQuery: {
            makeKey: ["bmw"],
          },
        },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/saved-searches$/),
        expect.any(Object)
      )
    })

    it("wraps location params", async () => {
      await sendSavedSearch({
        savedSearch: {
          email: "save@thesear.ch",
          language: "de",
          uiMetadata: {
            searchPath: "?cityId=1001&radius=20",
          },
          searchQuery: {
            cityId: "1001",
            radius: "20",
          },
        },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/saved-searches$/),
        expect.objectContaining({
          body: JSON.stringify({
            email: "save@thesear.ch",
            language: "de",
            uiMetadata: {
              searchPath: "?cityId=1001&radius=20",
            },
            searchQuery: {
              location: {
                cityId: "1001",
                radius: "20",
              },
            },
          }),
        })
      )
    })
  })

  describe("#deleteSavedSearch", () => {
    it("deletes saved search", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await deleteSavedSearch({ key: "qwertyuiop" })
      expect(response.tag).toEqual("success")
      expect(fetch).toBeCalledWith(
        expect.stringContaining("/saved-searches/key/qwertyuiop"),
        expect.objectContaining({ method: "DELETE" })
      )
    })

    it("handles response errors", async () => {
      fetchMock.mockResponses([null, { status: 404 }])

      const response = await deleteSavedSearch({ key: "qwertyuiop" })
      expect(response.tag).toEqual("error")
    })
  })

  describe("#extendSavedSearch", () => {
    it("extend saved search", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await extendSavedSearch({ key: "qwertyuiop" })
      expect(response.tag).toEqual("success")
      expect(fetch).toBeCalledWith(
        expect.stringContaining("/saved-searches/key/qwertyuiop"),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles response errors", async () => {
      fetchMock.mockResponses([null, { status: 404 }])

      const response = await extendSavedSearch({ key: "qwertyuiop" })
      expect(response.tag).toEqual("error")
    })
  })

  describe("#enableSavedSearch", () => {
    it("enables saved search", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await enableSavedSearch({ key: "qwertyuiop" })
      expect(response.tag).toEqual("success")
      expect(fetch).toBeCalledWith(
        expect.stringContaining("/saved-searches/key/qwertyuiop"),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles response errors", async () => {
      fetchMock.mockResponses([null, { status: 404 }])

      const response = await enableSavedSearch({ key: "qwertyuiop" })
      expect(response.tag).toEqual("error")
    })
  })

  describe("#fetchSavedSearch", () => {
    const savedSearch = {
      email: "save@thesear.ch",
      language: "de",
      uiMetadata: {
        searchPath: "?makeKeys=bmw",
      },
      searchQuery: {
        makeKey: ["bmw"],
      },
      enabledUntil: "2021-12-17T09:03:45.756493Z",
    }

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(savedSearch))
    })

    it("returns data", async () => {
      const fetched = await fetchSavedSearch({ key: "qwertyuiop" })

      expect(fetched).toEqual(savedSearch)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching("saved-searches/key/qwertyuiop"),
        expect.any(Object)
      )
    })
  })

  describe("#sendSavedSearchFeedback", () => {
    const savedSearchFeedback = {
      reason: "found-car-on-cfy",
      key: "qwertyuiop",
    }

    it("sends saved search feedback", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await sendSavedSearchFeedback(savedSearchFeedback)
      expect(response.tag).toEqual("success")

      expect(fetch).toBeCalledWith(
        expect.stringContaining(
          "/saved-searches/key/qwertyuiop/unsubscribe-feedback"
        ),
        expect.objectContaining({
          body: JSON.stringify({ reason: "found-car-on-cfy" }),
          method: "POST",
        })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [
        { message: "validation.unsubscribe-feedback-already-exists" },
      ]
      fetchMock.mockResponses([
        JSON.stringify({
          message,
          errors,
        }),
        { status: 422 },
      ])

      const response = await sendSavedSearchFeedback(savedSearchFeedback)

      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })
})
