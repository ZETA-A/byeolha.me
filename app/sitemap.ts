import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/config';

import { getSitemapPostList } from '@/utils/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const postList = await getSitemapPostList();
    const baseUrl = siteConfig.url;
    return [
        {
            url: baseUrl,
        },
        {
            url: `${baseUrl}/diary`,
        },
        {
            url: `${baseUrl}/note`,
        },
        {
            url: `${baseUrl}/project`,
        },
        {
            url: `${baseUrl}/resume`,
        },
        ...postList,
    ];
}
