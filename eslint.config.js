// eslint.config.js
import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    {
        files: ['**/*.ts'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: parserTs,
        },
        plugins: {
            '@typescript-eslint': eslintPluginTs,
        },
        rules: {
            // Warnung bei ungenutzten Variablen
            '@typescript-eslint/no-unused-vars': 'off',
             'no-console': 'warn', 

            // Leerzeilen-Regeln
            'padding-line-between-statements': [
                'error',


                // Importgruppen
                { blankLine: 'always', prev: 'import', next: '*' },
                { blankLine: 'any', prev: 'import', next: 'import' },

                

                // Nach const/let zu Ausdruck
                { blankLine: 'always', prev: ['const', 'let', 'var'], next: 'expression' },

                // Nach Ausdruck zu const/let
                { blankLine: 'always', prev: 'expression', next: ['const', 'let', 'var'] },

                // Vor return immer Leerzeile
                { blankLine: 'always', prev: '*', next: 'return' },

                // Vor if immer Leerzeile
                { blankLine: 'always', prev: '*', next: 'if' },

                // Nach if immer Leerzeile
                { blankLine: 'always', prev: 'if', next: '*' }
            ],
        },
        ignores: ['node_modules', 'dist'],
        settings: {},
    },
    prettier,
];
