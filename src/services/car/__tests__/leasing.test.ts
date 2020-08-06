import { fetchLeasingFormUrl } from "../leasing"

describe("CAR service", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchLeasingFormUrl", () => {
    it("returns the url", async () => {
      fetchMock.mockResponse(JSON.stringify({ url: "test-url" }))

      expect(
        await fetchLeasingFormUrl({ listingId: 123, locale: "de" })
      ).toEqual("test-url")
    })

    it("returns null if listing fails validation rules", async () => {
      fetchMock.mockResponse(JSON.stringify({ message: "too expensive" }), {
        status: 422,
      })

      expect(
        await fetchLeasingFormUrl({ listingId: 123, locale: "de" })
      ).toEqual(null)
    })
  })
})
