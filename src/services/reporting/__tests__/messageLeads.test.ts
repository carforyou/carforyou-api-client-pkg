import { fetchMessageLeads } from "../messageLeads"

describe("Reporting Service", () => {
  describe("fetchMessageLeads", () => {
    it("calls the api", async () => {
      await fetchMessageLeads({
        options: { accessToken: "Let me in, please." },
      })

      expect(fetch).toHaveBeenCalledWith(
        "test.gateway/users/me/message-leads",
        expect.any(Object)
      )
    })
  })
})
