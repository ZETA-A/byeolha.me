import type { PostSummary } from '../config/types';

export function seriesUrl(category: string, series: string) {
    return `/series/${encodeURIComponent(category)}/${encodeURIComponent(series)}`;
}

export function groupSeries(posts: PostSummary[]) {
    const groups = new Map<string, { category: string; series: string; name: string; url: string; count: number; modifiedAt: Date }>();
    for (const post of posts) {
        const url = seriesUrl(post.categoryPath, post.seriesPath);
        const previous = groups.get(url);
        groups.set(url, {
            category: post.categoryPath, series: post.seriesPath, name: post.seriesPublicName, url,
            count: (previous?.count ?? 0) + 1,
            modifiedAt: previous && previous.modifiedAt > post.modifiedAt ? previous.modifiedAt : post.modifiedAt,
        });
    }
    return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
}

export function findSeries(groups: ReturnType<typeof groupSeries>, category: string, series: string) {
    const matches = groups.filter(group =>
        (group.category === category || encodeURIComponent(group.category) === category) &&
        (group.series === series || encodeURIComponent(group.series) === series)
    );
    if (matches.length > 1) throw new Error(`Ambiguous series route: ${category}/${series}`);
    return matches[0];
}
