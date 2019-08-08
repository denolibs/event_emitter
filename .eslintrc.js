module.exports = {
  parser: "@typescript-eslint/parser", // ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended", // Rules from @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Disable ESLint rules from @typescript-eslint/eslint-plugin that conflict with prettier
    "plugin:prettier/recommended" // This will display prettier errors as ESLint errors. Should be last extends.
  ],
  parserOptions: {
    ecmaVersion: 2019, // ES10
    sourceType: "module" // Allows imports
  }
};
