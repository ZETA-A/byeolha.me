import localFont from 'next/font/local';

export const maruburi = localFont({
    src: [
        {
            path: '../public/fonts/MaruBuri/MaruBuri-Light.otf',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../public/fonts/MaruBuri/MaruBuri-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/MaruBuri/MaruBuri-SemiBold.otf',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../public/fonts/MaruBuri/MaruBuri-Bold.otf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-maruburi',
});

export const nanumHuman = localFont({
    src: [
        {
            path: '../public/fonts/NanumHuman/NanumHumanLight.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/NanumHuman/NanumHumanRegular.otf',
            weight: '500',
            style: 'normal',
        },
    ],
    variable: '--font-nanumhuman',
});
