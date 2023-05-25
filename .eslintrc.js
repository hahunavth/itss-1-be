module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '.jest.config.js', 'dist'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  // new rules for typescript
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.lint.json',
        ecmaVersion: 2020,
      },
      // settings: {
      //   'import/parsers': {
      //     '@typescript-eslint/parser': ['.ts'],
      //   },
      //   'import/resolver': {
      //     typescript: {
      //       // use <root>/path/to/folder/tsconfig.json
      //       // More examples: https://www.npmjs.com/package/eslint-import-resolver-typescript#configuration
      //       directory: './tsconfig.lint.json',
      //     },
      //   },
      // },
      // plugins: ['@typescript-eslint'],
      // extends: [
      //   'plugin:import/typescript',
      //   'plugin:@typescript-eslint/eslint-recommended',
      //   'plugin:@typescript-eslint/recommended',
      //   'plugin:@typescript-eslint/recommended-requiring-type-checking',
      // ],
      // rules: {
      //   '@typescript-eslint/restrict-plus-operands': 'error',
      //   'import/no-extraneous-dependencies': [
      //     'error',
      //     { devDependencies: ['**/*spec.ts', '**/global.d.ts'] },
      //   ],
      //   'no-useless-constructor': 'off',
      //   '@typescript-eslint/no-useless-constructor': 'error',
      //   '@typescript-eslint/no-explicit-any': 'off',
      //   '@typescript-eslint/no-non-null-assertion': 'off',
      //   '@typescript-eslint/member-delimiter-style': [
      //     'error',
      //     {
      //       // Prevents us from using any delimiter for interface properties.
      //       multiline: {
      //         delimiter: 'semi',
      //         requireLast: true,
      //       },
      //       singleline: {
      //         delimiter: 'semi',
      //         requireLast: false,
      //       },
      //     },
      //   ],
      //   '@typescript-eslint/indent': 'off', // This is the job of StandardJS, they are competing rules so we turn off the Typescript one.
      //   '@typescript-eslint/no-use-before-define': [
      //     'error',
      //     {
      //       functions: false,
      //       classes: false,
      //     },
      //   ],
      //   '@typescript-eslint/explicit-member-accessibility': ['error'],
      //   'function-paren-newline': 'off',
      //   'implicit-arrow-linebreak': 'off',
      //   '@typescript-eslint/explicit-function-return-type': 'off',
      //   '@typescript-eslint/unbound-method': 'off',
      //   '@typescript-eslint/no-inferrable-types': 'off',
      // },
    },
    {
      files: ['**/*spec.ts'],
      rules: {
        'max-classes-per-file': 'off',
      },
    },
  ],
};
