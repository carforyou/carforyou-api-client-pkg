import { createLoanInterest } from "../loan"
import { LoanInterest } from "../../../types/models/loan"
import { EmploymentType, Gender } from "../../../types/models"

describe("#createLoanInterest", () => {
  const loanInterest = (
    attributes: Partial<LoanInterest> = {}
  ): LoanInterest => ({
    address: "address",
    amount: 4000,
    birthdate: "2011-04-04",
    citizenshipCountryCode: "CH",
    duration: 24,
    email: "max@muster.ch",
    employmentType: EmploymentType.PERMANENT,
    firstName: "Max",
    gender: Gender.MALE,
    hasOngoingDebtEnforcements: true,
    language: "en",
    lastName: "Muster",
    monthlyIncome: 8000,
    phone: "0627771144",
    workPermit: null,
    workPermitIssueDate: null,
    zipCode: "4600",
    ...attributes,
  })

  const mockResponse = loanInterest()
  beforeEach(() => {
    fetchMock.mockResponse(JSON.stringify(mockResponse))
  })

  it("calls submission endpoint", async () => {
    await createLoanInterest({
      listingId: 12345,
      loanInterest: loanInterest(),
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/listings\/12345\/loan-interests$/),
      expect.any(Object)
    )
  })

  it("calls validation endpoint when requested", async () => {
    await createLoanInterest({
      listingId: 12345,
      loanInterest: loanInterest(),
      options: { validateOnly: true },
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/listings\/12345\/loan-interests\/validate$/),
      expect.any(Object)
    )
  })

  describe("valid parameters", () => {
    it("returns a success", async () => {
      const result = await createLoanInterest({
        listingId: 12345,
        loanInterest: loanInterest(),
      })

      expect(result).toEqual({
        tag: "success",
        result: loanInterest(),
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
      const result = await createLoanInterest({
        listingId: 12345,
        loanInterest: loanInterest({
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
