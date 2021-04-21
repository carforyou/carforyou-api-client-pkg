import { fetchBuyerFeedbackBatch } from "../buyerFeedbackBatch"

describe("Buyer Feedback Batch", () => {
  beforeEach(fetchMock.resetMocks)

  const entriesMock = {
    key: "123",
    listing: {
      dealer: {
        id: 12,
        location: {
          city: "Test city",
          zipCode: "4567",
        },
        name: "Tester",
      },
      id: 23,
      image: {
        s3Key: "s3/image.jpg",
      },
      make: "Audi",
      model: "A3",
      price: 150000,
      type: "sport",
    },
  }

  describe("#fetchBuyerFeedbackBatch", () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(entriesMock))
    })

    it("fetches data", async () => {
      const data = await fetchBuyerFeedbackBatch({ key: "007" })

      expect(data).toEqual(entriesMock)
    })
  })
})
