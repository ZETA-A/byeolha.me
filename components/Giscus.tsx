'use client';

import { useTheme } from 'next-themes';
import { useEffect, useRef } from 'react';

const giscusThemes = {
    light: 'https://giscus.app/themes/noborder_light.css',
    dark: 'https://giscus.app/themes/noborder_gray.css',
} as const;

export default function Giscus() {
    const ref = useRef<HTMLDivElement>(null);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        if (!ref.current || !resolvedTheme) {
            return;
        }

        if (ref.current.querySelector('script[data-giscus-script="true"]')) {
            return;
        }

        const script = document.createElement('script');
        const initialTheme =
            resolvedTheme === 'dark' ? giscusThemes.dark : giscusThemes.light;

        script.src = 'https://giscus.app/client.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-giscus-script', 'true');

        script.setAttribute('data-repo', 'ZETA-A/byeolha.me');
        script.setAttribute('data-repo-id', 'R_kgDON4-ZFg');
        script.setAttribute('data-category', 'Comments');
        script.setAttribute('data-category-id', 'DIC_kwDON4-ZFs4CoLmi');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'bottom');
        script.setAttribute('data-theme', initialTheme);
        script.setAttribute('data-lang', 'ko');

        ref.current.appendChild(script);
    }, [resolvedTheme]);

    // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
    useEffect(() => {
        const nextTheme =
            resolvedTheme === 'dark' ? giscusThemes.dark : giscusThemes.light;
        const container = ref.current;
        if (!container) return;
        const updateTheme = () => {
            const iframe = container.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
            iframe?.contentWindow?.postMessage(
                { giscus: { setConfig: { theme: nextTheme } } },
                'https://giscus.app'
            );
        };
        // Reapply after the asynchronously inserted iframe finishes loading.
        container.addEventListener('load', updateTheme, true);
        const observer = new MutationObserver(updateTheme);
        observer.observe(container, { childList: true, subtree: true });
        updateTheme();
        return () => {
            container.removeEventListener('load', updateTheme, true);
            observer.disconnect();
        };
    }, [resolvedTheme]);

    return <section ref={ref} />;
}
