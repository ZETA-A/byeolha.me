import { groupSeries } from '@/utils/series';
import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/config';

import { getPostSummaryList, getSitemapPostList } from '@/utils/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const postList = await getSitemapPostList();
    const series = groupSeries(await getPostSummaryList());
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
        { url: `${baseUrl}/search` },
        ...postList,
        ...series.map(item => ({ url: `${baseUrl}${item.url}`, lastModified: item.modifiedAt })),
    ];
}
