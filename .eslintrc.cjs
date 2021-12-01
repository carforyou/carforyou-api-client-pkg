module.exports = {
  extends: ["@carforyou/eslint-config"],
  rules: {
    // We need conditional expects for error cases in api calls
    // where we want to match our error type
    "jest/no-conditional-expect": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "enumMember",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
      },
      {
        selector: "variableLike",
        format: ["camelCase", "PascalCase", "snake_case"],
        leadingUnderscore: "allow",
      },
    ],
  },
}
