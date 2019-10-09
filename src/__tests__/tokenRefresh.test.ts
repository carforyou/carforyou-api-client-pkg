import apiClient from "../apiClient"
import { withTokenRefresh } from "../tokenRefresh"
import { ResponseError } from "../responseError"

describe("apiClient", () => {
  describe("#withTokenRefresh", () => {
    const apiCall = jest.fn(() => Promise.resolve({ ok: true }))

    afterEach(() => {
      apiCall.mockClear()
      fetchMock.resetMocks()
    })

    describe("on a failed api call that is unauthorized", () => {
      const mockRefresh = jest.fn()
      const mockRefreshFailure = jest.fn()

      beforeEach(() => {
        apiClient.setHandlers({
          onFailedTokenRefresh: mockRefreshFailure,
          onAccessTokenUpdate: mockRefresh
        })

        apiCall.mockImplementationOnce(() => {
          throw new ResponseError({ status: 401 })
        })
      })

      describe("and a successfull refresh", () => {
        beforeEach(() => {
          fetchMock.mockResponseOnce(
            JSON.stringify({
              refresh_token: "new refresh",
              access_token: "new access"
            })
          )
        })

        it("retries the API call", async () => {
          const result = await withTokenRefresh(apiCall)

          expect(apiCall).toHaveBeenCalledTimes(2)
          expect(result).toEqual({ ok: true })
        })

        it("updates the tokens", async () => {
          await withTokenRefresh(apiCall)

          expect(apiClient.tokens.accessToken).toEqual("new access")
          expect(apiClient.tokens.refreshToken).toEqual("new refresh")
        })

        it("calls the update handler with new access token", async () => {
          await withTokenRefresh(apiCall)

          expect(mockRefresh).toHaveBeenCalledWith("new access")
        })
      })

      describe("and a failed refresh", () => {
        beforeEach(() => {
          fetchMock.mockResponseOnce(JSON.stringify({ ok: false }), {
            status: 400
          })
        })

        it("calls refresh failure", async () => {
          await withTokenRefresh(apiCall)

          expect(mockRefreshFailure).toHaveBeenCalled()
        })
      })
    })

    describe("on a failed api call that's not unauthorized", () => {
      beforeEach(() => {
        apiCall.mockImplementationOnce(() => {
          throw new ResponseError({ status: 400 })
        })
      })

      it("only tries the api call once", async () => {
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

        expect(fetchMock).toHaveBeenCalledTimes(0)
      })

      it("rethrows the error", async () => {
        await expect(
          withTokenRefresh(apiCall)
        ).rejects.toThrowErrorMatchingSnapshot()
      })
    })
  })
})
