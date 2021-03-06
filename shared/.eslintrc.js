module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.json',
      },
    },
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/naming-convention': 'warn',
    '@typescript-eslint/semi': 'warn',
    eqeqeq: 'warn',
    'no-throw-literal': 'warn',
    semi: 'off',
    '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
    'max-len': ['error', { code: 150 }],
    'prefer-template': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
  },
  ignorePatterns: ['out', '**/*.d.ts', 'node_modules'],
};
