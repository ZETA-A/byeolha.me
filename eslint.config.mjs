import nextPlugin from '@next/eslint-plugin-next';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
    },
    {
        files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        ...nextPlugin.configs['core-web-vitals'],
    },
];
