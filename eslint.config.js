const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
        fetch: 'readonly'
      }
    },
    rules: {
      'indent': [
        'error',
        2,
        {
          'SwitchCase': 1
        }
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'always'
      ],
      'no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_'
        }
      ]
    }
  },
  {
    ignores: [
      'node_modules/**',
      'coverage/**',
      '**/*.min.js'
    ]
  }
];
