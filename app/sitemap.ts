import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/config';

import { getSitemapPostList } from '@/utils/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const postList = await getSitemapPostList();
    const baseUrl = siteConfig.url;
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/category`,
            lastModified: new Date(),
        },
        ...postList,
    ];
}
