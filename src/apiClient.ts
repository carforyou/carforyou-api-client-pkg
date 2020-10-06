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
  accessToken: string | null
  handlers: Handlers
  version: string
  refreshToken: () => Promise<{ accessToken: string }>

  constructor() {
    if (ApiClient.instance) return ApiClient.instance

    this.configuration = {}
    this.accessToken = null
    this.handlers = {}
    this.version = "v1"
    this.refreshToken = async () => {
      throw new Error(
        "The refreshToken function has not been set the the apiClient instance, use apiClient.setTokenRefresh to pass a function which handles the token refresh"
      )
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

  public setAccessToken(accessToken: string): void {
    this.accessToken = accessToken
  }

  public setTokenRefreshHandler(
    handler: () => Promise<{ accessToken: string }>
  ): void {
    this.refreshToken = handler
  }

  public setHandlers(handlers: Handlers): void {
    this.handlers.onAccessTokenUpdate = handlers.onAccessTokenUpdate
    this.handlers.onFailedTokenRefresh = handlers.onFailedTokenRefresh
  }
}

export default new ApiClient()
export const Constructor = ApiClient
