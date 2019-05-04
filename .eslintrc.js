const off = 0;
const warn = 1;
const error = 2;

module.exports = {
  extends: ["airbnb", "prettier"],
  rules: {
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-one-expression-per-line": 0,
    "import/no-extraneous-dependencies": 0,
    "react/style-prop-object": 0,
    "react/jsx-indent-props": 0,
    "import/prefer-default-export": 0,
    "import/newline-after-import": 0,
    "import/order": 0,
    "consistent-return": 0,
    "global-require": 0,
    "import/no-dynamic-require": 0,
  },
};
