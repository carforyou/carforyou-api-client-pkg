import { defaultUserMessageLead, userMessageLeadFactory } from "../reporting"

describe("Reporting service factories", () => {
  describe("userMessageLead", () => {
    it("returns a UserMessageLead", () => {
      const userMessageLead = userMessageLeadFactory()

      expect(userMessageLead).toEqual(defaultUserMessageLead)
    })

    it("overrides the defaultUserMessageLead", () => {
      const userMessageLead = userMessageLeadFactory({
        listing: {
          make: "BMW",
        },
      })

      expect(userMessageLead).toEqual({
        ...defaultUserMessageLead,
        listing: { ...defaultUserMessageLead.listing, make: "BMW" },
      })
    })
  })
})
