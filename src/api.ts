export interface ApiClientConfig {
  carServiceUrl?: string
  searchServiceUrl?: string
  catalogueServiceUrl?: string
  dealerServiceUrl?: string
  debug?: boolean
}

class API {
  static instance: API
  configuration: ApiClientConfig
  version: string

  constructor() {
    this.version = "v1"
    this.configuration = {}
    API.instance = this
  }

  public initialize(configuration: ApiClientConfig) {
    if (Object.keys(this.configuration).length) {
      throw new Error("Owerwriting API client configuration")
    }

    Object.keys(configuration).forEach(key => {
      this.configuration[key] = configuration[key]
    })
  }
}

const instance = new API()
Object.freeze(instance)

export default instance
