module.exports = {
  extends: ["@carforyou/eslint-config"],
  rules: {
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
