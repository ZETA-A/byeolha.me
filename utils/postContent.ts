import matter from 'gray-matter';
import { load, JSON_SCHEMA } from 'js-yaml';
import readingTime from 'reading-time';
import { normalizePostMatter, formatPostDate } from './postMatter.ts';
import extractKeywords from './extractKeywords.ts';

export function parsePostSource(file: string, source: string) {
    const { data, content } = matter(file, {
        engines: { yaml: text => load(text, { schema: JSON_SCHEMA }) as Record<string, unknown> },
    });
    const frontmatter = normalizePostMatter(data, source);
    return {
        ...frontmatter,
        content,
        createDateDisplay: formatPostDate(frontmatter.createdAt),
        modifiedDateDisplay: formatPostDate(frontmatter.modifiedAt),
    };
}

export function summarizePost(source: ReturnType<typeof parsePostSource>) {
    // Keep body-derived work out of lists and the sitemap.
    const { content: _content, ...summary } = source;
    void _content;
    return summary;
}

export function enrichPost(source: ReturnType<typeof parsePostSource>) {
    return {
        ...source,
        readingMinutes: Math.ceil(readingTime(source.content).minutes),
        generatedKeywords: source.keywords
            ? source.keywords.split(',').map(word => word.trim()).filter(Boolean)
            : extractKeywords(source.content, 5),
    };
}

export function formatPostTitle(title: string, seriesPublicName: string) {
    const prefix = `(${seriesPublicName})`;
    // Keep older articles readable while authors migrate their frontmatter.
    return title === prefix || title.startsWith(`${prefix} `) ? title : `${prefix} ${title}`;
}
