import { createLeasingInterest } from "../leasing"
import { LeasingInterest } from "../../../types/models/leasing"

describe("#createLeasingInterest", () => {
  const leasingInterest = (
    attributes: Partial<LeasingInterest> = {}
  ): LeasingInterest => ({
    downPayment: 15000,
    duration: 24,
    email: "max@redbull.at",
    estimatedKmPerYear: 10000,
    firstName: "Max",
    language: "de",
    lastName: "Perez",
    phone: "0795558844",
    residualValue: 5000,
    ...attributes,
  })

  const mockResponse = leasingInterest()
  beforeEach(() => {
    fetchMock.mockResponse(JSON.stringify(mockResponse))
  })

  it("calls submission endpoint", async () => {
    await createLeasingInterest({
      listingId: 12345,
      leasingInterest: leasingInterest(),
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/listings\/12345\/leasing-interests$/),
      expect.any(Object)
    )
  })

  it("calls validation endpoint when requested", async () => {
    await createLeasingInterest({
      listingId: 12345,
      leasingInterest: leasingInterest(),
      options: { validateOnly: true },
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/listings\/12345\/leasing-interests\/validate$/),
      expect.any(Object)
    )
  })

  describe("valid parameters", () => {
    it("returns a success", async () => {
      const result = await createLeasingInterest({
        listingId: 12345,
        leasingInterest: leasingInterest(),
      })

      expect(result).toEqual({
        tag: "success",
        result: leasingInterest(),
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

    it("returns validation error", async () => {
      const result = await createLeasingInterest({
        listingId: 12345,
        leasingInterest: leasingInterest({
          email: "test@test",
        }),
      })

      expect(result.tag).toEqual("error")

      if (result.tag === "error") {
        expect(result.errors).toEqual(errors)
        expect(result.message).toEqual("validations.not-valid")
      }
    })
  })
})
