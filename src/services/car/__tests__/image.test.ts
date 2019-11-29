import { fetchDealerListingImages } from "../image"

describe("Dealer listing images", () => {
  beforeEach(fetchMock.resetMocks)

  describe("fetchDealerListingImages", () => {
    const dealerId = 123789
    const listingId = 789123
    const dealerListingImages = {
      detectedCarImageId: 54625,
      images: [
        {
          id: 555,
          externalUrl: "http://carforyou.ch",
          s3Key: "s3key"
        }
      ],
      listingId,
      spinCode: "111"
    }

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(dealerListingImages))
    })

    it("returns data", async () => {
      const fetched = await fetchDealerListingImages(dealerId, listingId)

      expect(fetched).toEqual(dealerListingImages)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
