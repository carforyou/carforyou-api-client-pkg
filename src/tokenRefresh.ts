import apiClient from "./apiClient"
import { Service, postData } from "./base"

const invokeTokenRefresh = async () => {
  debugger
  const { accessToken } = await apiClient.refreshToken()

  // TODO: We probably wanna pass that to be able to handle server and client side refreshes.....
  // TODO: this can be get right?
  //const { accessToken } = await postData(Service.TOKEN_REFRESH, "refresh-token")

  apiClient.setAccessToken(accessToken)
  if (apiClient.handlers.onAccessTokenUpdate) {
    apiClient.handlers.onAccessTokenUpdate(apiClient.accessToken)
  }
}

const refreshTokenAndRetry = async (apiCall) => {
  // TODO: we might wanna have state in here an just wait for the refresh to complete when there is one in progress
  try {
    await invokeTokenRefresh()
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

// TODO: move this to an imperative style and don't add the auth token when it's missing so the requests fail initial on not just on token refresh
export const withTokenRefresh = async (apiCall) => {
  debugger
  try {
    return await apiCall()
  } catch (error) {
    if (error.name === "ResponseError" && error.status.toString() === "401") {
      return refreshTokenAndRetry(apiCall)
    }

    throw error
  }
}
