import apiClient from "./apiClient"
import { Service, postData } from "./base"

const refreshToken = async () => {
  const { refresh_token, access_token } = await postData(
    Service.TOKEN_REFRESH,
    "refresh-token",
    { token: apiClient.tokens.refreshToken }
  )

  apiClient.setTokens({
    accessToken: access_token,
    refreshToken: refresh_token,
  })
  if (apiClient.handlers.onAccessTokenUpdate) {
    apiClient.handlers.onAccessTokenUpdate(apiClient.tokens.accessToken)
  }
}

const refreshTokenAndRetry = async (apiCall) => {
  try {
    await refreshToken()
    return apiCall()
  } catch (error) {
    if (error.name === "ResponseError") {
      const status = error.status.toString()
      if (
        (status.startsWith("4") || status.startsWith("5")) &&
        apiClient.handlers.onFailedTokenRefresh
      ) {
        apiClient.handlers.onFailedTokenRefresh()
      }

      return
    }

    throw error
  }
}

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
