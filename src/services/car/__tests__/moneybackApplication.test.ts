import { sendMoneybackApplication } from "../moneybackApplication"

describe("Car API", () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  const moneybackApplication = (attributes = {}) => ({
    email: "test@test.com",
    language: "en",
    firstName: "Tester",
    lastName: "Test",
    birthdate: "01-01-1990",
    street: "Testrs.",
    streetNumber: "42",
    city: "Test City",
    zipCode: "123456",
    serialNumber: "123.456.789",
    gender: "m",
    phone: "+4178123456",
    contractStartDate: "2020-10-10",
    sellingPrice: 12500,
    vehicleConditionsConfirmation: true,
    termsAndConditionsConfirmation: true,
    ...attributes,
  })

  describe("#sendMoneybackApplication", () => {
    it("sends validate fields in the header", async () => {
      await sendMoneybackApplication({
        listingId: 12345,
        moneybackApplication: moneybackApplication(),
        options: { validateFields: ["gender", "email"] },
      })

      expect(fetch).toHaveBeenCalledWith(expect.any(String), {
        headers: expect.objectContaining({
          "Validate-Fields": "gender,email",
        }),
        body: expect.any(String),
        method: "POST",
      })
    })

    describe("valid parameters", () => {
      beforeEach(() => {
        fetchMock.mockResponse("")
      })

      describe("validate only", () => {
        it("calls validation endpoint", async () => {
          await sendMoneybackApplication({
            listingId: 12345,
            moneybackApplication: moneybackApplication(),
            options: {
              validateOnly: true,
            },
          })

          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(
              /\/listings\/12345\/mbg-applications\/validate$/
            ),
            expect.any(Object)
          )
        })

        it("returns a success", async () => {
          const result = await sendMoneybackApplication({
            listingId: 12345,
            moneybackApplication: moneybackApplication(),
            options: {
              validateOnly: true,
            },
          })

          expect(result).toEqual({
            tag: "success",
            result: moneybackApplication(),
          })
        })
      })

      describe("submit", () => {
        it("calls submission endpoint", async () => {
          await sendMoneybackApplication({
            listingId: 12345,
            moneybackApplication: moneybackApplication(),
          })

          expect(fetch).toHaveBeenCalledWith(
            expect.stringMatching(/\/listings\/12345\/mbg-applications$/),
            expect.any(Object)
          )
        })

        it("returns a success", async () => {
          const result = await sendMoneybackApplication({
            listingId: 12345,
            moneybackApplication: moneybackApplication(),
          })

          expect(result).toEqual({
            tag: "success",
            result: moneybackApplication(),
          })
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
        const result = await sendMoneybackApplication({
          listingId: 12345,
          moneybackApplication: moneybackApplication({ email: "test@test" }),
        })

        expect(result.tag).toEqual("error")
        if (result.tag === "error") {
          expect(result.errors).toEqual(errors)
          expect(result.message).toEqual("validations.not-valid")
        }
      })
    })

    describe("other a 5xx error", () => {
      beforeEach(() => {
        fetchMock.mockResponse("", {
          status: 500,
        })
      })

      it("returns success", async () => {
        const result = await sendMoneybackApplication({
          listingId: 12345,
          moneybackApplication: moneybackApplication(),
        })

        expect(result.tag).toEqual("success")
      })
    })
  })
})
