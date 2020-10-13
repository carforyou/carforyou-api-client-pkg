import apiClient from "./apiClient"

// const invokeTokenRefresh = async () => {
//   const { accessToken } = await apiClient.refreshToken()

//   apiClient.setAccessToken(accessToken)
//   if (apiClient.handlers.onAccessTokenUpdate) {
//     apiClient.handlers.onAccessTokenUpdate(apiClient.accessToken)
//   }
// }

// let pendingRefreshRequest = false
// const waitForPendingRefresh = async (apiCall) => {
//   return new Promise((resolve) => {
//     setTimeout(async () => {
//       return pendingRefreshRequest
//         ? resolve(waitForPendingRefresh(apiCall))
//         : resolve(apiCall())
//     }, 100)
//   })
// }

// const refreshTokenAndRetry = async (apiCall) => {
//   if (pendingRefreshRequest) return waitForPendingRefresh(apiCall)

//   try {
//     pendingRefreshRequest = true
//     await invokeTokenRefresh()
//     pendingRefreshRequest = false
//   } catch (error) {
//     if (apiClient.handlers.onFailedTokenRefresh) {
//       apiClient.handlers.onFailedTokenRefresh()
//     }

//     throw error
//   }

//   return apiCall()
// }

export const withTokenRefresh = async (apiCall) => {
  return await apiCall()

  // try {
  // } catch (error) {
  //   if (error.name === "ResponseError" && error.status.toString() === "401") {
  //     return refreshTokenAndRetry(apiCall)
  //   }

  //   throw error
  // }
}
