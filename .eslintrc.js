module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/no-unused-vars": 0, // Turn off the rule
    // Alternatively, set it to a warning:
    // "@typescript-eslint/no-unused-vars": 1,
  },
};
