import type { Metadata } from 'next';
import { siteConfig } from '../config/config';

export function pageMetadata(
    title: string,
    description: string,
    pathname: string
): Metadata {
    const images = [{ url: siteConfig.defaultThumbnail, width: 800, height: 600 }];
    return {
        title,
        description,
        alternates: { canonical: pathname },
        openGraph: {
            title,
            description,
            url: pathname,
            siteName: siteConfig.title,
            images,
        },
        twitter: {
            title,
            description,
            card: 'summary_large_image',
            images: [siteConfig.defaultThumbnail],
        },
    };
}
