/* eslint-disable quote-props */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/essential",
    "@vue/standard",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/adjacent-overload-signatures": 2,
    // "@typescript-eslint/class-name-casing": 2, // removed from @typescript-eslint, replaced by @typescript-eslint/naming-convention
    "@typescript-eslint/explicit-function-return-type": [2, { "allowExpressions": true }],
    "@typescript-eslint/explicit-member-accessibility": 0,
    // "@typescript-eslint/interface-name-prefix": [2, "never"], // removed from @typescript-eslint, replaced by @typescript-eslint/naming-convention
    "@typescript-eslint/member-delimiter-style": 2,
    "@typescript-eslint/member-naming": 0,
    "@typescript-eslint/member-ordering": 2,
    "@typescript-eslint/no-array-constructor": 2,
    "@typescript-eslint/no-empty-interface": 2,
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-inferrable-types": [2, { "ignoreProperties": true, "ignoreParameters": true }],
    // "@typescript-eslint/no-namespace": [1, { "allowDeclarations": true, "allowDefinitionFiles": true }],
    "@typescript-eslint/no-namespace": 0,
    "@typescript-eslint/no-non-null-assertion": 1,
    "@typescript-eslint/no-parameter-properties": 2,
    "@typescript-eslint/no-type-alias": 0,
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "@typescript-eslint/no-use-before-define": 2,
    "@typescript-eslint/no-var-requires": 2,
    "@typescript-eslint/prefer-namespace-keyword": 2,
    "@typescript-eslint/semi": [2, "always", { "omitLastInOneLineBlock": true }],
    "@typescript-eslint/triple-slash-reference": 2,
    "@typescript-eslint/type-annotation-spacing": 0,
    "@typescript-eslint/unbound-method": 0,
    "arrow-body-style": 0,
    "class-methods-use-this": 0,
    "comma-dangle": [2, "always-multiline"],
    "consistent-return": [2, { "treatUndefinedAsUnspecified": true }],
    "func-names": 0,
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "key-spacing": 0,
    "lines-between-class-members": 0,
    // "max-len": [1, { "ignoreTrailingComments": true }],
    "max-len": 0,
    "newline-per-chained-call": 0,
    "no-multi-spaces": 0,
    "no-plusplus": 0,
    "no-restricted-globals": 0,
    "no-undef": 0,
    "no-underscore-dangle": 0,
    "no-unused-vars": [2, { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
    "no-void": 0,
    "object-curly-newline": 1,
    "operator-linebreak": [2, "before"],
    "prefer-destructuring": [2, { "object": true, "array": false }],
    "prefer-template": 1,
    "quotes": 0,
    // // conflicts with TS' semi rule; see https://github.com/typescript-eslint/typescript-eslint/issues/123
    // "semi": [2, "always", { "omitLastInOneLineBlock": true }],
    "semi": 0,
    "space-before-function-paren": 0,
    "standard/no-callback-literal": 0,
    "valid-typeof": 0,
    "vars-on-top": 0,
    "wrap-iife": [1, "inside"],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
