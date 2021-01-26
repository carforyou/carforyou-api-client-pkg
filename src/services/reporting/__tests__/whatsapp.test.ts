import { postWhatsappTrackingEntry } from "../whatsapp"
import { WhatsappEntry } from "../../../types/models"

describe("Whatsapp API", () => {
  const whatsappEntry: WhatsappEntry = {
    firstName: "Test firstname",
    language: "de",
    lastName: "Test lastname",
    phone: "+41781234567",
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

    const responses = [
      { param: "firstName", message: "validation.field.not-empty" },
      { param: "language", message: "validation.field.not-empty" },
      { param: "lastName", message: "validation.field.not-empty" },
      { param: "phone", message: "validation.field.not-empty" },
    ]

    responses.forEach((response) => {
      it("should return error if a field is empty or missing", async () => {
        const whatsAppEntryToBeSent = { ...whatsappEntry }
        delete whatsAppEntryToBeSent[response.param]
        const result = await postWhatsappTrackingEntry({
          listingId: 12345,
          whatsappEntry: { ...whatsAppEntryToBeSent },
          options: {
            validateOnly: true,
          },
        })
        expect(result.tag).toEqual("error")
        if (result.tag === "error") {
          expect(result.errors).toEqual([{ ...response }])
          expect(result.message).toEqual("validation.not-valid")
        }
      })
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
