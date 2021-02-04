module.exports = {
  root: true,
  parser: "babel-eslint",
  extends: ["airbnb", "plugin:prettier/recommended", "prettier/react"],
  plugins: ["react-hooks"],
  rules: {
    "no-console": "off",
    "no-nested-ternary": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "react/prop-types": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
  globals: {
    fetch: "readonly",
    window: "readonly",
  },
};
