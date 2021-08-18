import {
  deleteSavedSearch,
  enableSavedSearch,
  fetchSavedSearch,
  sendSavedSearch,
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
})
