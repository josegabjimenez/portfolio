module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    amd: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  extends: [
    'eslint:recommended',
    // 'plugin:jsx-a11y/recommended',
    'next',
    'next/core-web-vitals',
  ],
  //plugins: ["react"],
  rules: {
    "react/no-unknown-property": "off",
    "@next/next/no-page-custom-font": "off",
    semi: ['error', 'always'],
  },
};
