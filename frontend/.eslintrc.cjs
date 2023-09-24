module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-constant-condition': 'off',
    "react/react-in-jsx-scope": "off",
    'react/self-closing-comp': [
      'warn',
      {
        component: true,
        html: true
      }
    ],
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true
      },
    ],
  },
}
