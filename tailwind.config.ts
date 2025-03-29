import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                gray: {
                    50: 'var(--gray-50)',
                    75: 'var(--gray-75)',
                    100: 'var(--gray-100)',
                    200: 'var(--gray-200)',
                    300: 'var(--gray-300)',
                    400: 'var(--gray-400)',
                    500: 'var(--gray-500)',
                    600: 'var(--gray-600)',
                    700: 'var(--gray-700)',
                    800: 'var(--gray-800)',
                    900: 'var(--gray-900)',
                },
                selection: 'var(--selection)',
                border: 'var(--border)',
                pastel: {
                    green: 'var(--pastel-green)',
                    orange: 'var(--pastel-orange)',
                    gray: 'var(--pastel-gray)',
                },
            },
            textColor: {
                heading: 'var(--heading)',
                body: 'var(--text-body)',
                second: 'var(--text-second)',
                disabled: 'var(--text-disabled)',
            },
            backgroundColor: {
                page: 'var(--page-background)',
            },
            fontFamily: {
                serif: ['var(--font-maruburi)', 'serif'],
                sans: ['var(--font-nanumHuman)', 'sans-serif'],
                monospace: ['var(--font-jetbrainsMono)', 'monospace'],
            },
            maxWidth: {
                page: 'var(--page-width)',
                content: 'var(--content-width)',
            },
            width: {
                page: 'var(--page-width)',
                content: 'var(--content-width)',
            },
            spacing: {
                page: 'var(--page-top)',
                'half-page': 'var(--page-half-top)',
            },
        },
    },
    darkMode: 'class',
    future: {
        hoverOnlyWhenSupported: true,
    },
    variants: {
        typography: ['dark'],
    },
    plugins: [require('@tailwindcss/typography')],
} satisfies Config;
