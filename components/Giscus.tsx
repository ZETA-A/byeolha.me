'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

const giscusThemes = {
    light: 'https://giscus.app/themes/noborder_light.css',
    dark: 'https://giscus.app/themes/noborder_gray.css',
} as const;

export default function Giscus() {
    const ref = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const setTheme =
            theme === 'dark' ? giscusThemes.dark : giscusThemes.light;

        if (!ref.current) {
            return;
        }

        const script = document.createElement('script');

        script.src = 'https://giscus.app/client.js';
        script.async = true;
        script.crossOrigin = 'anonymous';

        script.setAttribute('data-repo', 'ZETA-A/byeolha.me');
        script.setAttribute('data-repo-id', 'R_kgDON4-ZFg');
        script.setAttribute('data-category', 'Comments');
        script.setAttribute('data-category-id', 'DIC_kwDON4-ZFs4CoLmi');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'bottom');
        script.setAttribute('data-theme', setTheme);
        script.setAttribute('data-lang', 'ko');

        ref.current.appendChild(script);
    }, [theme]);

    // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
    useEffect(() => {
        const iframe = document.querySelector<HTMLIFrameElement>(
            'iframe.giscus-frame'
        );
        iframe?.contentWindow?.postMessage(
            { giscus: { setConfig: { theme } } },
            'https://giscus.app'
        );
    }, [theme]);

    return <section ref={ref} />;
}
