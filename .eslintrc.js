module.exports = {
  root: true,
  extends: '@react-native',
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-dupe-keys': 'off',
    'no-useless-escape': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'prefer-const': 'off',
    'no-unsafe-optional-chaining': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
};
