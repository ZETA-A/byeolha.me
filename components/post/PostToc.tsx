'use client';

import { useEffect, useRef, type ComponentProps } from 'react';

export default function PostToc(props: ComponentProps<'details'>) {
    if (!props.className?.split(' ').includes('post-toc')) return <details {...props} />;
    return <FloatingToc {...props} />;
}

function FloatingToc({ children, ...props }: ComponentProps<'details'>) {
    const ref = useRef<HTMLDetailsElement>(null);
    useEffect(() => {
        const toc = ref.current;
        if (!toc) return;
        const media = window.matchMedia('(min-width: 1200px)');
        const updateLayout = () => { toc.open = media.matches; };
        updateLayout();
        media.addEventListener('change', updateLayout);

        const sections = Array.from(toc.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]')).flatMap(link => {
            const heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
            return heading ? [{ link, heading }] : [];
        });
        const markers = Array.from(toc.querySelectorAll<HTMLElement>('.toc-marker'));
        let frame = 0;
        const updateSection = () => {
            frame = 0;
            let current = sections[0];
            for (const section of sections) {
                if (section.heading.getBoundingClientRect().top <= 144) current = section;
                else break;
            }
            for (const [index, section] of sections.entries()) {
                markers[index]?.classList.toggle('is-current', section === current);
                if (section === current) section.link.setAttribute('aria-current', 'location');
                else section.link.removeAttribute('aria-current');
            }
        };
        const scheduleUpdate = () => { if (!frame) frame = requestAnimationFrame(updateSection); };
        updateSection();
        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener('resize', scheduleUpdate);
        // Images and fonts can shift headings after the initial render.
        const observer = new ResizeObserver(scheduleUpdate);
        const article = toc.parentElement;
        if (article) observer.observe(article);
        return () => {
            media.removeEventListener('change', updateLayout);
            window.removeEventListener('scroll', scheduleUpdate);
            window.removeEventListener('resize', scheduleUpdate);
            observer.disconnect();
            cancelAnimationFrame(frame);
        };
    }, []);
    return <details {...props} ref={ref}>{children}</details>;
}
