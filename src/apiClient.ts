export interface ApiClientConfig {
  carServiceUrl?: string
  searchServiceUrl?: string
  catalogueServiceUrl?: string
  dealerServiceUrl?: string
  optionServiceUrl?: string
  analyticsServiceUrl?: string
  userNotificationServiceUrl?: string
  debug?: boolean
}

export interface Handlers {
  onAccessTokenUpdate?: (token: string) => void
  onFailedTokenRefresh?: () => void
}

class ApiClient {
  private static instance: ApiClient

  configuration: ApiClientConfig
  accessToken: {
    token: string | null
    expires: Date | null
  }
  handlers: Handlers
  version: string
  runsInBrowser: boolean
  refreshToken: () => Promise<{ accessToken: string }>
  ensureTokenFreshness: () => void

  constructor() {
    if (ApiClient.instance) return ApiClient.instance

    this.configuration = {}
    this.accessToken = {
      expires: null,
      token: null,
    }
    this.handlers = {}
    this.version = "v1"
    this.runsInBrowser = typeof window !== "undefined"
    this.refreshToken = async () => {
      throw new Error(
        "The refreshToken function has not been set on the apiClient instance, use apiClient.setTokenRefreshHandler to pass a function which handles the token refresh"
      )
    }
    this.ensureTokenFreshness = async () => {
      console.log("ensure fresshenes!!!", Date.now())
      console.log("ensure fresshenes!!!", this.accessToken)
      // TODO: check weather the token is n minutes valid if not refreh it
    }
    if (this.runsInBrowser) {
      window.setInterval(this.ensureTokenFreshness, 60 * 1000)
    }

    ApiClient.instance = this
    return ApiClient.instance
  }

  public configure(configuration: ApiClientConfig): void {
    if (Object.keys(this.configuration).length) {
      throw new Error("Owerwriting API client configuration")
    }

    Object.keys(configuration).forEach((key) => {
      this.configuration[key] = configuration[key]
    })
  }

  public getConfiguration() {
    return {
      ...this.configuration,
      configured: Object.keys(this.configuration).length > 0,
      version: this.version,
    }
  }

  public setAccessToken(accessToken: { token: string; expires: Date }): void {
    if (!this.runsInBrowser) {
      throw new Error(
        "You may only globally set (xyz) and access-token on a client side usage, to avoid leaking the token on the global module for a server side implementation. Please pass the access-token as an option to the request instead when using the package server side!"
      )
    }
    console.log("setting thems access token", accessToken)
    this.accessToken = accessToken
  }

  public setTokenRefreshHandler(
    handler: () => Promise<{ accessToken: string; expires: string }>
  ): void {
    if (!this.runsInBrowser) {
      throw new Error(
        "You tried to assign a token refresh handler without a browser context, please ensure to only implement this for the client side part of your application."
      )
    }
    this.refreshToken = handler
  }

  public setHandlers(handlers: Handlers): void {
    this.handlers.onAccessTokenUpdate = handlers.onAccessTokenUpdate
    this.handlers.onFailedTokenRefresh = handlers.onFailedTokenRefresh
  }
}

export default new ApiClient()
export const Constructor = ApiClient
