import { postCallTrackingEntry } from "../callTracking"
import { Language } from "../../../types/params"
import { CallTrackingEntry } from "../../../types/models/tracking"

describe("Call Tracking API", () => {
  const callTrackingEntry: CallTrackingEntry = {
    language: "de",
  }

  it("should call api in v1", async () => {
    await postCallTrackingEntry({
      listingId: 12345,
      body: callTrackingEntry,
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

  it("should call the validate endpoint", async () => {
    await postCallTrackingEntry({
      listingId: 12345,
      body: callTrackingEntry,
      options: {
        validateOnly: true,
      },
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(
        /\/listings\/12345\/call-tracking-entries\/validate$/
      ),
      expect.any(Object)
    )
  })

  it("should return success if all data is valid", async () => {
    const response = await postCallTrackingEntry({
      listingId: 12345,
      body: callTrackingEntry,
      options: {
        validateOnly: true,
      },
    })

    expect(response).toEqual({ tag: "success", result: callTrackingEntry })
  })

  it("should map the error correctly", async () => {
    const errors = [
      { param: "language", message: "validation.field.not-empty" },
    ]
    fetchMock.mockResponseOnce(
      JSON.stringify({
        message: "validation.not-valid",
        errors,
      }),
      { status: 400 }
    )
    const response = await postCallTrackingEntry({
      listingId: 12345,
      body: { language: "" as Language },
      options: {
        validateOnly: true,
      },
    })

    expect(response.tag).toEqual("error")
    if (response.tag === "error") {
      expect(response.errors).toEqual(errors)
      expect(response.message).toEqual("validation.not-valid")
    }
  })

  it("should call the submit endpoint", async () => {
    await postCallTrackingEntry({
      listingId: 12345,
      body: callTrackingEntry,
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/listings\/12345\/call-tracking-entries$/),
      expect.any(Object)
    )
  })

  it("should return success", async () => {
    const response = await await postCallTrackingEntry({
      listingId: 12345,
      body: callTrackingEntry,
    })

    expect(response).toEqual({ tag: "success", result: callTrackingEntry })
  })
})
