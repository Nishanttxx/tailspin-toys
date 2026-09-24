import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  // Global ignores
  {
    ignores: ['dist/', 'node_modules/', '.astro/', 'db/migrations/'],
  },

  // Base JavaScript/TypeScript recommended rules
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Global settings for all files
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Allow unused variables prefixed with _ (common convention for intentional skips)
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Astro files
  ...eslintPluginAstro.configs.recommended,

  // TypeScript-specific overrides
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
    },
  },

  // Shared application TypeScript formatting rules
  {
    files: ['db/**/*.ts', 'src/**/*.ts', 'e2e-tests/**/*.ts', 'eslint.config.js'],
    rules: {
      'array-bracket-spacing': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      semi: ['error', 'always'],
    },
  },
];
