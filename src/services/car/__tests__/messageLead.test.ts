import {
  fetchDealerCallLeads,
  fetchDealerMessageLeads,
  fetchDealerWhatsappLeads,
  hideCallLead,
  hideMessageLead,
  hideWhatsappLead,
  resendMessageLead,
  sendMessageLead,
} from "../messageLead"

import { defaultLeadSort } from "../messageLead"
import { PaginatedLeads } from "../../../lib/factories/paginated"
import {
  SearchCallLead as SearchCallLeadFactory,
  SearchMessageLead as SearchMessageLeadFactory,
  SearchWhatsappLead as SearchWhatsappLeadFactory,
} from "../../../lib/factories/leads"

describe("Car API", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const messageLead = (attributes = {}) => ({
    language: "de",
    firstName: "Test firstname",
    lastName: "Test lastname",
    phone: "+41781234567",
    email: "test@test.com",
    message: "This is a message of a interested customer",
    videoCallPreference: {
      available: true,
      services: [],
      otherService: "some other cool video provider",
    },
    ...attributes,
  })

  describe("#messageLead", () => {
    it("merges otherService into services in videoCallPreference", async () => {
      await sendMessageLead({ listingId: 12345, messageLead: messageLead() })

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: JSON.stringify({
            language: "de",
            firstName: "Test firstname",
            lastName: "Test lastname",
            phone: "+41781234567",
            email: "test@test.com",
            message: "This is a message of a interested customer",
            videoCallPreference: {
              available: true,
              services: ["some other cool video provider"],
            },
          }),
        })
      )
    })

    it("calls api v2", async () => {
      await sendMessageLead({ listingId: 12345, messageLead: messageLead() })

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Accept: "application/vnd.carforyou.v2+json",
          }),
        })
      )
    })

    describe("valid parameters", () => {
      beforeEach(() => {
        fetchMock.mockResponse("")
      })

      describe("validate only", () => {
        it("calls validation endpoint", async () => {
          await sendMessageLead({
            listingId: 12345,
            messageLead: messageLead(),
            options: {
              validateOnly: true,
            },
          })

          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(
              /\/listings\/12345\/message-leads\/validate$/
            ),
            expect.any(Object)
          )
        })

        it("returns a success", async () => {
          const result = await sendMessageLead({
            listingId: 12345,
            messageLead: messageLead(),
            options: {
              validateOnly: true,
            },
          })

          expect(result).toEqual({ tag: "success", result: messageLead() })
        })
      })

      describe("submit", () => {
        it("calls submission endpoint", async () => {
          await sendMessageLead({
            listingId: 12345,
            messageLead: messageLead(),
          })

          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/\/listings\/12345\/message-leads$/),
            expect.any(Object)
          )
        })

        it("returns a success", async () => {
          const result = await sendMessageLead({
            listingId: 12345,
            messageLead: messageLead(),
          })

          expect(result).toEqual({ tag: "success", result: messageLead() })
        })
      })
    })

    describe("invalid parameters", () => {
      const errors = [{ param: "email", error: "validations.invalid-format" }]

      beforeEach(() => {
        fetchMock.mockResponse(
          JSON.stringify({ errors, message: "validations.not-valid" }),
          {
            status: 400,
          }
        )
      })

      it("returns a failure", async () => {
        const result = await sendMessageLead({
          listingId: 12345,
          messageLead: messageLead({ email: "test@test" }),
        })

        expect(result.tag).toEqual("error")
        if (result.tag === "error") {
          expect(result.errors).toEqual(errors)
          expect(result.message).toEqual("validations.not-valid")
        }
      })
    })

    describe("on a 5xx error", () => {
      beforeEach(() => {
        fetchMock.mockResponse("", {
          status: 500,
        })
      })

      it("returns success", async () => {
        const result = await sendMessageLead({
          listingId: 12345,
          messageLead: messageLead(),
        })

        expect(result.tag).toEqual("success")
      })
    })
  })

  describe("#fetchDealerMessageLeads", () => {
    // use only data that we need for leads messages
    const { content, pagination } = PaginatedLeads([SearchMessageLeadFactory()])

    beforeEach(() => {
      fetchMock.mockClear()
      fetchMock.mockResponse(
        JSON.stringify({
          content: content,
          ...pagination,
        })
      )
    })

    it("calls correct endpoint", async () => {
      await fetchDealerMessageLeads({
        dealerId: 1234,
        query: {
          page: 2,
          size: 7,
          sort: defaultLeadSort,
          searchQuery: "test",
        },
        options: {
          accessToken: "DummyTokenString",
        },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/dealers\/1234\/message-leads\?page=1&size=7&sort=createdDate%2Cdesc&?q=test$/
        ),
        expect.any(Object)
      )
    })

    it("should trow error if accessToken is not passed", async () => {
      let error
      try {
        await fetchDealerMessageLeads({
          dealerId: 1234,
          query: {
            page: 0,
            size: 7,
            sort: {},
            searchQuery: "",
          },
        })
      } catch (err) {
        error = err
      }

      expect(fetch).not.toHaveBeenCalled()
      expect(error).toBeDefined()
      expect(error.message).toBeDefined()
    })

    it("should return paginated leads messages data", async () => {
      const result = await fetchDealerMessageLeads({
        dealerId: 1234,
        query: {
          page: 0,
          size: 7,
          sort: {},
          searchQuery: "",
        },
        options: {
          accessToken: "DummyTokenString",
        },
      })

      expect(fetch).toHaveBeenCalled()
      expect(result).toEqual(PaginatedLeads([SearchMessageLeadFactory()]))
    })
  })

  describe("#hideMessageLead", () => {
    it("hides a message lead", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await hideMessageLead({
        dealerId: 1234,
        messageLeadId: 501,
        options: {
          accessToken: "DummyTokenString",
        },
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("dealers/1234/message-leads/501/hide"),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "email", message: "validation.field.not-empty" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await hideMessageLead({
        dealerId: 1234,
        messageLeadId: 501,
        options: {
          accessToken: "DummyTokenString",
        },
      })
      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })

  describe("#fetchDealerCallLeads", () => {
    const { content, pagination } = PaginatedLeads([SearchCallLeadFactory()])

    beforeEach(() => {
      fetchMock.mockClear()
      fetchMock.mockResponse(
        JSON.stringify({
          content: content,
          ...pagination,
        })
      )
    })

    it("calls correct endpoint", async () => {
      await fetchDealerCallLeads({
        dealerId: 1234,
        query: {
          page: 2,
          size: 7,
          sort: defaultLeadSort,
        },
        options: {
          accessToken: "DummyTokenString",
        },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/dealers\/1234\/call-leads\?page=1&size=7&sort=createdDate%2Cdesc$/
        ),
        expect.any(Object)
      )
    })

    it("should trow error if accessToken is not passed", async () => {
      let error
      try {
        await fetchDealerCallLeads({
          dealerId: 1234,
          query: {
            page: 0,
            size: 7,
            sort: {},
          },
        })
      } catch (err) {
        error = err
      }

      expect(fetch).not.toHaveBeenCalled()
      expect(error).toBeDefined()
      expect(error.message).toBeDefined()
    })

    it("should return paginated leads calls data", async () => {
      const result = await fetchDealerCallLeads({
        dealerId: 1234,
        query: {
          page: 0,
          size: 7,
          sort: {},
        },
        options: {
          accessToken: "DummyTokenString",
        },
      })

      expect(fetch).toHaveBeenCalled()
      expect(result).toEqual(PaginatedLeads([SearchCallLeadFactory()]))
    })
  })

  describe("#fetchDealerWhatsappLeads", () => {
    const { content, pagination } = PaginatedLeads([
      SearchWhatsappLeadFactory(),
    ])

    beforeEach(() => {
      fetchMock.mockClear()
      fetchMock.mockResponse(
        JSON.stringify({
          content: content,
          ...pagination,
        })
      )
    })

    it("calls correct endpoint", async () => {
      await fetchDealerWhatsappLeads({
        dealerId: 1234,
        query: {
          page: 2,
          size: 7,
          sort: defaultLeadSort,
        },
        options: {
          accessToken: "DummyTokenString",
        },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/dealers\/1234\/whats-app-tracking-entries\?page=1&size=7&sort=createdDate%2Cdesc$/
        ),
        expect.any(Object)
      )
    })

    it("should trow error if accessToken is not passed", async () => {
      await expect(
        fetchDealerWhatsappLeads({
          dealerId: 1234,
          query: {
            page: 0,
            size: 7,
            sort: {},
          },
        })
      ).rejects.toEqual(
        new Error(
          "You tried to make an authenticated requests without providing an access token!\n Please pass a valid token as a request option."
        )
      )
      expect(fetch).not.toHaveBeenCalled()
    })

    it("should return paginated leads calls data", async () => {
      const result = await fetchDealerWhatsappLeads({
        dealerId: 1234,
        query: {
          page: 0,
          size: 7,
          sort: {},
        },
        options: {
          accessToken: "DummyTokenString",
        },
      })

      expect(fetch).toHaveBeenCalled()
      expect(result).toEqual(PaginatedLeads([SearchWhatsappLeadFactory()]))
    })
  })

  describe("#hideCallLead", () => {
    it("hides a call lead", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await hideCallLead({
        dealerId: 1234,
        callLeadId: 501,
        options: {
          accessToken: "DummyTokenString",
        },
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("dealers/1234/call-leads/501/hide"),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "email", message: "validation.field.not-empty" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await hideCallLead({
        dealerId: 1234,
        callLeadId: 501,
        options: {
          accessToken: "DummyTokenString",
        },
      })
      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })

  describe("#resendMessageLead", () => {
    it("resends a message lead", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await resendMessageLead({
        dealerId: 1234,
        messageLeadId: 501,
        options: {
          accessToken: "DummyTokenString",
        },
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("dealers/1234/message-leads/501/resend"),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "email", message: "validation.field.not-empty" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await resendMessageLead({
        dealerId: 1234,
        messageLeadId: 501,
        options: {
          accessToken: "DummyTokenString",
        },
      })
      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })

  describe("#hideWhatsappLead", () => {
    it("hides a whatsapp lead", async () => {
      fetchMock.mockResponse(JSON.stringify({ ok: true }))

      const response = await hideWhatsappLead({
        dealerId: 1234,
        id: 501,
        options: {
          accessToken: "DummyTokenString",
        },
      })
      expect(response).toEqual({ tag: "success", result: {} })
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "dealers/1234/whats-app-tracking-entries/501/hide"
        ),
        expect.objectContaining({ method: "POST" })
      )
    })

    it("handles validation error", async () => {
      const message = "not-valid"
      const errors = [{ param: "email", message: "validation.field.not-empty" }]
      fetchMock.mockResponses([
        JSON.stringify({ message, errors }),
        { status: 400 },
      ])

      const response = await hideWhatsappLead({
        dealerId: 1234,
        id: 501,
        options: {
          accessToken: "DummyTokenString",
        },
      })
      expect(response).toEqual({
        tag: "error",
        message,
        errors,
        globalErrors: [],
      })
    })
  })
})
