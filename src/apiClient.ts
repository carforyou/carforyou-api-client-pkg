export interface ApiClientConfig {
  carServiceUrl?: string
  searchServiceUrl?: string
  catalogueServiceUrl?: string
  dealerServiceUrl?: string
  optionServiceUrl?: string
  analyticsServiceUrl?: string
  userNotificationServiceUrl?: string
  tokenRefreshServiceUrl?: string
  debug?: boolean
}

export interface Tokens {
  accessToken?: string
  refreshToken?: string
}

export interface Handlers {
  onAccessTokenUpdate?: (token: string) => void
  onFailedTokenRefresh?: () => void
}

class ApiClient {
  static instance: ApiClient

  configuration: ApiClientConfig = {}
  tokens: Tokens = {}
  handlers: Handlers = {}
  version = "v1"

  constructor() {
    ApiClient.instance = this
  }

  public configure(configuration: ApiClientConfig): void {
    if (Object.keys(this.configuration).length) {
      throw new Error("Owerwriting API client configuration")
    }

    Object.keys(configuration).forEach((key) => {
      this.configuration[key] = configuration[key]
    })
  }

  public setTokens(tokens: Tokens): void {
    this.tokens.accessToken = tokens.accessToken
    this.tokens.refreshToken = tokens.refreshToken
  }

  public setHandlers(handlers: Handlers): void {
    this.handlers.onAccessTokenUpdate = handlers.onAccessTokenUpdate
    this.handlers.onFailedTokenRefresh = handlers.onFailedTokenRefresh
  }
}

const instance = new ApiClient()
Object.freeze(instance)

export default instance
