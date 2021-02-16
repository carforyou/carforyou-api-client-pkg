import {
  fetchDealerListingImages,
  fetchImageEnrichment,
  generatePresignedImageUrl,
  saveDealerListingImages,
} from "../image"
import { Listing } from "../../../lib/factories/listing"

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
          s3Key: "s3key",
        },
      ],
      listingId,
      spinCode: "111",
    }

    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(dealerListingImages))
    })

    it("returns data", async () => {
      const fetched = await fetchDealerListingImages({
        dealerId,
        listingId,
        options: { accessToken: "TOKEN" },
      })

      expect(fetched).toEqual(dealerListingImages)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          `/dealers/${dealerId}/listings/${listingId}/images`
        ),
        expect.any(Object)
      )
    })
  })

  describe("#saveDealerListingImages", () => {
    it("sends images in the body", async () => {
      const images = [
        {
          id: 1000001,
          externalUrl: "../../static/images/placeholder.png",
          s3Key: "2018/09/04/12/24/28/mercedes-benz-c-180-kompressor.jpg",
        },
        {
          id: 1000002,
          externalUrl: "../../static/images/placeholder.png",
          s3Key: "2018/09/04/12/24/28/mercedes-benz-c-180-kompressor-1.jpg",
        },
      ]
      const listing = Listing({ images, id: 5 })

      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await saveDealerListingImages({
        dealerId: 123,
        listing,
        options: { accessToken: "TOKEN" },
      })
      expect(response).toEqual({ tag: "success", result: listing })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/dealers/123/listings/5/images"),
        expect.objectContaining({
          body: JSON.stringify({ images }),
        })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "images", error: "validations.not-empty" }]

      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await saveDealerListingImages({
        dealerId: 123,
        listing: Listing({ images: [] }),
        options: { accessToken: "TOKEN" },
      })

      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })

  describe("#generatePresignedUrl", () => {
    it("posts the image data", async () => {
      const presignedUrl = {
        presignedUrl: "https://s3.bucket/qwertyuiop",
        s3Key: "2020/10/10/test-image.jpg",
      }
      fetchMock.mockResponse(JSON.stringify(presignedUrl))

      const imageData = {
        key: "test-image",
        title: "Test image",
        contentType: "image/jpg",
      }
      const response = await generatePresignedImageUrl({
        imageData,
        options: { accessToken: "TOKEN" },
      })

      expect(response).toEqual(presignedUrl)
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/images/generate-presigned-url"),
        expect.objectContaining({
          body: JSON.stringify(imageData),
        })
      )
    })
  })

  describe("#fetchImageEnrichment", () => {
    it("fetches the data", async () => {
      const enrichment = { imageId: 1, enrichment: { car: "97%" } }
      fetchMock.mockResponse(JSON.stringify(enrichment))

      const data = await fetchImageEnrichment({ imageId: 1 })
      expect(data).toEqual(enrichment)
      expect(fetch).toHaveBeenCalled()
    })
  })
})
