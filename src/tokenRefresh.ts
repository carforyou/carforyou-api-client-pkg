import apiClient from "./apiClient"

const invokeTokenRefresh = async () => {
  const { accessToken } = await apiClient.refreshToken()

  apiClient.setAccessToken(accessToken)
  if (apiClient.handlers.onAccessTokenUpdate) {
    apiClient.handlers.onAccessTokenUpdate(apiClient.accessToken)
  }
}

let pendingRefreshRequest = false
const waitForPendingRefresh = async (apiCall) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      return pendingRefreshRequest
        ? resolve(waitForPendingRefresh(apiCall))
        : resolve(apiCall())
    }, 100)
  })
}

const refreshTokenAndRetry = async (apiCall) => {
  if (pendingRefreshRequest) return waitForPendingRefresh(apiCall)

  try {
    pendingRefreshRequest = true
    await invokeTokenRefresh()
    pendingRefreshRequest = false
  } catch (error) {
    if (apiClient.handlers.onFailedTokenRefresh) {
      apiClient.handlers.onFailedTokenRefresh()
    }

    throw error
  }

  return apiCall()
}

// TODO: move this to an imperative style and don't add the auth token when it's missing so the requests fail initial on not just on token refresh
export const withTokenRefresh = async (apiCall) => {
  try {
    return await apiCall()
  } catch (error) {
    if (error.name === "ResponseError" && error.status.toString() === "401") {
      return refreshTokenAndRetry(apiCall)
    }

    throw error
  }
}
