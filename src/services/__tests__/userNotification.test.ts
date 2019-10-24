import { sendSavedSearch } from "../userNotification"

describe("USER_NOTIFICATION service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("sendSavedSearch", () => {
    beforeEach(() => {
      fetchMock.mockResponse("")
    })

    it("calls endpoint", async () => {
      await sendSavedSearch({
        email: "save@thesear.ch",
        language: "de",
        searchPath: "?makeKeys=bmw",
        uiMetadata: {},
        searchQuery: {
          makeKey: ["bmw"]
        }
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /user_notification\.service\.test\/saved-searches$/
        ),
        expect.any(Object)
      )
    })

    it("wraps location params", async () => {
      await sendSavedSearch({
        email: "save@thesear.ch",
        language: "de",
        searchPath: "?cityId=1001&radius=20",
        uiMetadata: {},
        searchQuery: {
          cityId: "1001",
          radius: "20"
        }
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /user_notification\.service\.test\/saved-searches$/
        ),
        expect.objectContaining({
          body: JSON.stringify({
            email: "save@thesear.ch",
            language: "de",
            searchPath: "?cityId=1001&radius=20",
            uiMetadata: {},
            searchQuery: {
              location: {
                cityId: "1001",
                radius: "20"
              }
            }
          })
        })
      )
    })
  })
})
