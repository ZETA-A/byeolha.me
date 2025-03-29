import localFont from 'next/font/local';

export const maruburi = localFont({
    src: [
        {
            path: '../public/fonts/MaruBuri/woff2/MaruBuri-ExtraLight.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../public/fonts/MaruBuri/woff2/MaruBuri-Light.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../public/fonts/MaruBuri/woff2/MaruBuri-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/MaruBuri/woff2/MaruBuri-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../public/fonts/MaruBuri/woff2/MaruBuri-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-maruburi',
});

export const nanumHuman = localFont({
    src: [
        {
            path: '../public/fonts/NanumHuman/woff2/NanumHumanEL.woff2',
            weight: '200',
            style: 'normal',
        },
        {
            path: '../public/fonts/NanumHuman/woff2/NanumHumanLight.woff2',
            weight: '350',
            style: 'normal',
        },
        {
            path: '../public/fonts/NanumHuman/woff2/NanumHumanRegular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/NanumHuman/woff2/NanumHumanBold.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../public/fonts/NanumHuman/woff2/NanumHumanEB.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../public/fonts/NanumHuman/woff2/NanumHumanHeavy.woff2',
            weight: '900',
            style: 'normal',
        },
    ],
    variable: '--font-nanumHuman',
});

export const jetbrainsMono = localFont({
    src: [
        {
            path: '../public/fonts/JetBrainsMono/JetBrainsMono-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-jetbrainsMono',
});
