import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/config';

import { getSitemapPostList } from '@/utils/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const postList = await getSitemapPostList();
    const baseUrl = siteConfig.url;
    const staticLastModified = new Date(`${siteConfig.since}-01-01T00:00:00.000Z`);
    return [
        {
            url: baseUrl,
            lastModified: staticLastModified,
        },
        {
            url: `${baseUrl}/diary`,
            lastModified: staticLastModified,
        },
        {
            url: `${baseUrl}/note`,
            lastModified: staticLastModified,
        },
        {
            url: `${baseUrl}/project`,
            lastModified: staticLastModified,
        },
        {
            url: `${baseUrl}/resume`,
            lastModified: staticLastModified,
        },
        ...postList,
    ];
}
