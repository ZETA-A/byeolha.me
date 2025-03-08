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
                maruburi: ['var(--font-maruburi)'],
                nanumHuman: ['var(--font-nanumhuman)'],
            },
        },
    },
    darkMode: 'class',
    variants: {
        typography: ['dark'],
    },
    plugins: [require('@tailwindcss/typography')],
} satisfies Config;
