import { sendSavedSearch } from "../userNotification"

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
})
