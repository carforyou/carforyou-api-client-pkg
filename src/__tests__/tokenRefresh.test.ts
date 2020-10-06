import apiClient from "../apiClient"
import { withTokenRefresh } from "../tokenRefresh"
import { ResponseError } from "../responseError"

// TODO: FIXME
// TODO: try to clean up the overdone nesting
describe("the token refresh handling", () => {
  const apiCall = jest.fn(() => Promise.resolve({ ok: true }))

  afterEach(() => {
    apiCall.mockReset()
  })

  describe("a unauthorized api call - 401", () => {
    const mockOnAccessTokenUpdate = jest.fn()
    const mockOnAccessTokenUpdateFailure = jest.fn()

    beforeEach(() => {
      apiClient.setHandlers({
        onFailedTokenRefresh: mockOnAccessTokenUpdateFailure,
        onAccessTokenUpdate: mockOnAccessTokenUpdate,
      })

      apiCall.mockImplementationOnce(() => {
        throw new ResponseError({ status: 401 })
      })
    })

    describe("a successfull refresh", () => {
      apiClient.setTokenRefreshHandler(async () => ({
        accessToken: "new access",
      }))

      it("retries the API call", async () => {
        const result = await withTokenRefresh(apiCall)

        expect(apiCall).toHaveBeenCalledTimes(2)
        expect(result).toEqual({ ok: true })
      })

      it("refreshes the tokens", async () => {
        await withTokenRefresh(apiCall)

        expect(apiClient.accessToken).toEqual("new access")
      })

      it("calls the update handler with the new access token", async () => {
        await withTokenRefresh(apiCall)

        expect(mockOnAccessTokenUpdate).toHaveBeenCalledWith("new access")
      })

      it("calls the refresh handler once for parallel requests and waits for the pending request", async () => {
        const mockTokenRefreshHandler = jest.fn(
          async (): Promise<{
            accessToken: string
          }> => {
            // Ensure multiple timeout ticks are tested
            return new Promise((resolve) => {
              setTimeout(() => {
                return resolve({
                  accessToken: "new access",
                })
              }, 250)
            })
          }
        )
        apiClient.setTokenRefreshHandler(mockTokenRefreshHandler)
        const mockCallOne = jest
          .fn()
          .mockImplementationOnce(async () => {
            throw new ResponseError({ status: 401 })
          })
          .mockImplementationOnce(async () => ({
            status: 200,
          }))
        const mockCallTwo = jest
          .fn()
          .mockImplementationOnce(async () => {
            throw new ResponseError({ status: 401 })
          })
          .mockImplementationOnce(async () => ({
            status: 200,
          }))
        await Promise.all([
          withTokenRefresh(mockCallOne),
          withTokenRefresh(mockCallTwo),
        ])

        expect(mockTokenRefreshHandler).toHaveBeenCalledTimes(1)
        expect(mockOnAccessTokenUpdate).toHaveBeenCalledWith("new access")
        expect(mockCallOne).toHaveBeenCalledTimes(2)
        expect(mockCallTwo).toHaveBeenCalledTimes(2)
      })
    })

    describe("a failed refresh", () => {
      beforeEach(() => {
        apiCall.mockImplementationOnce(() => {
          throw new ResponseError({ status: 401 })
        })
        apiClient.setTokenRefreshHandler(async () => {
          return Promise.reject("I failed")
        })
      })

      it("calls refresh failure handler", async () => {
        try {
          await withTokenRefresh(apiCall)
        } catch {
          //
        }

        expect(mockOnAccessTokenUpdateFailure).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe("any other error 4xx, 5xx", () => {
    const mockTokenRefreshHandler = jest.fn()
    beforeEach(() => {
      apiCall.mockImplementation(() => {
        throw new ResponseError({ status: 400 })
      })
      apiClient.setTokenRefreshHandler(mockTokenRefreshHandler)
    })

    it("only executes the api call once", async () => {
      try {
        await withTokenRefresh(apiCall)
      } catch {
        //
      }

      expect(apiCall).toHaveBeenCalledTimes(1)
    })

    it("does not try to refresh the token", async () => {
      try {
        await withTokenRefresh(apiCall)
      } catch {
        //
      }

      expect(mockTokenRefreshHandler).toHaveBeenCalledTimes(0)
    })

    it("rethrows the error", async () => {
      await expect(withTokenRefresh(apiCall)).rejects.toThrowError(
        new ResponseError({ status: 400 })
      )
    })
  })
})
