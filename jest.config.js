/* tslint:disable:object-literal-sort-keys */
module.exports = {
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: false
    }
  },
  testPathIgnorePatterns: [
    "<rootDir>/__tests__/setup/",
    "<rootDir>/pkg/"
  ],
  setupFiles: [
    "<rootDir>/__tests__/setup/fetchMock.ts",
  ],
  setupFilesAfterEnv: [
    "<rootDir>/__tests__/setup/setupConfiguration.ts"
  ],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.(t|j)s"],
  preset: "ts-jest"
}
