import { fetchDealerSuggestions } from "../dealer"

describe("Dealer", () => {
  describe("#fetchDealerSuggestions", () => {
    it("encodes the query", async () => {
      const query = "k+k"
      await fetchDealerSuggestions(query)

      expect(fetch).toHaveBeenCalledWith(
        `dealer.service.test/dealers/suggestions?q=${encodeURIComponent(
          query
        )}`,
        expect.any(Object)
      )
    })
  })
})
