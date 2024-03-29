import { postWhatsappTrackingEntry } from "../whatsapp"
import { WhatsappEntry } from "../../../types/models/tracking"

describe("Whatsapp API", () => {
  const whatsappEntry: WhatsappEntry = {
    firstName: "Test firstname",
    language: "de",
    lastName: "Test lastname",
    phone: "+41781234567",
    type: "default",
  }

  it("should call api v1", async () => {
    await postWhatsappTrackingEntry({
      listingId: 12345,
      whatsappEntry: { ...whatsappEntry },
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: "application/vnd.carforyou.v1+json",
        }),
      })
    )
  })

  describe("validate", () => {
    it("should call the validate endpoint", async () => {
      await postWhatsappTrackingEntry({
        listingId: 12345,
        whatsappEntry: { ...whatsappEntry },
        options: {
          validateOnly: true,
        },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(
          /\/listings\/12345\/whats-app-tracking-entries\/validate$/
        ),
        expect.any(Object)
      )
    })

    it("should return success if all data is valid", async () => {
      const response = await postWhatsappTrackingEntry({
        listingId: 12345,
        whatsappEntry: { ...whatsappEntry },
        options: {
          validateOnly: true,
        },
      })

      expect(response).toEqual({ tag: "success", result: whatsappEntry })
    })

    it("should map the error correctly", async () => {
      const errors = [
        { param: "firstName", message: "validation.field.not-empty" },
      ]
      fetchMock.mockResponseOnce(
        JSON.stringify({
          message: "validation.not-valid",
          errors,
        }),
        { status: 400 }
      )

      const whatsAppEntryToBeSent = { ...whatsappEntry }
      delete whatsAppEntryToBeSent["firstName"]
      const result = await postWhatsappTrackingEntry({
        listingId: 12345,
        whatsappEntry: { ...whatsAppEntryToBeSent },
        options: {
          validateOnly: true,
        },
      })

      expect(result.tag).toEqual("error")
      if (result.tag === "error") {
        expect(result.errors).toEqual(errors)
        expect(result.message).toEqual("validation.not-valid")
      }
    })
  })

  describe("submit", () => {
    it("should call the submit endpoint", async () => {
      await postWhatsappTrackingEntry({
        listingId: 12345,
        whatsappEntry: { ...whatsappEntry },
      })

      expect(fetch).toHaveBeenCalledWith(
        expect.stringMatching(/\/listings\/12345\/whats-app-tracking-entries$/),
        expect.any(Object)
      )
    })

    it("should return success", async () => {
      const response = await postWhatsappTrackingEntry({
        listingId: 12345,
        whatsappEntry: { ...whatsappEntry },
      })

      expect(response).toEqual({ tag: "success", result: whatsappEntry })
    })
  })
})
