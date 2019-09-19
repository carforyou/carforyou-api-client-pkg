/**
 * See: https://github.com/jefflau/jest-fetch-mock#typescript-guide.
 */
import { GlobalWithFetchMock } from "jest-fetch-mock"

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock
customGlobal.fetch = require("jest-fetch-mock")
customGlobal.fetchMock = customGlobal.fetch
