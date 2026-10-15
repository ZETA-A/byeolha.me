import type { Options } from 'rehype-pretty-code';

export const codeThemeOptions = {
    theme: {
        light: 'material-theme-lighter',
        dark: 'material-theme',
    },
    keepBackground: true,
} satisfies Options;
