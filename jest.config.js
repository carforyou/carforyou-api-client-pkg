module.exports = {
  globals: {
    "ts-jest": {
      diagnostics: false,
    },
  },
  testPathIgnorePatterns: [
    "<rootDir>/__tests__/setup/",
    "<rootDir>/__tests__/factories/",
    "<rootDir>/pkg/",
  ],
  setupFiles: ["<rootDir>/src/__tests__/setup/fetchMock.ts"],
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup/apiClient.ts"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testMatch: ["**/__tests__/**/*.test.(t|j)s"],
  preset: "ts-jest",
}
