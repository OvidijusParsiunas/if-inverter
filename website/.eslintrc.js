module.exports = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb-typescript'],
  parser: '@typescript-eslint/parser',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
    },
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    'max-len': ['error', { code: 150 }],
    'prefer-template': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    'linebreak-style': 0,
    'no-bitwise': ['error', { allow: ['<<', '|'] }],
    'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx'] }],
    'react/react-in-jsx-scope': 'off',
    'object-curly-newline': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'import/no-relative-packages': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
  },
};
