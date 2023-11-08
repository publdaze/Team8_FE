module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', '@tanstack/query'],
  extends: [
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }], // tsx파일에도 jsx 구문 사용 가능하도록 허용
    'import/extensions': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['arrow-function'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelAttributes: ['htmlFor'],
      },
    ],
    '@tanstack/query/exhaustive-deps': 'error',
    '@tanstack/query/prefer-query-object-syntax': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
