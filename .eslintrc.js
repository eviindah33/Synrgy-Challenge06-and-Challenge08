module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "space-before-function-paren": "off",
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: true }],
    camelcase: 1,
  },
};
