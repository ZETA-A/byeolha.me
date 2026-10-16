import type { Post } from '../config/types';
import type { SearchDocument } from './search.ts';
import removeMD from './removeMD.ts';

export function buildSearchIndex(posts: Post[]): SearchDocument[] {
    return [...posts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map(post => ({
        url: post.url,
        title: post.title,
        category: post.categoryPath,
        series: post.seriesPublicName,
        keywords: post.generatedKeywords,
        description: post.description || removeMD(post.content, 140),
        date: post.createDateDisplay,
    }));
}
