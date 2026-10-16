import path from 'node:path';
import { sync } from 'glob';

export const BASE_PATH = 'posts';
export const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

function validateSegment(value: string, source: string) {
    if (
        typeof value !== 'string' || !value.trim() || value === '.' || value === '..' ||
        value.includes('/') || value.includes('\\') ||
        Array.from(value).some(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127)
    ) {
        throw new Error(`${source}: invalid post folder name: ${JSON.stringify(value)}`);
    }
    return value;
}

export function getSeriesPublicName(series: string) {
    validateSegment(series, 'Series');
    return series.split('_').filter(Boolean)
        .map(token => token[0].toUpperCase() + token.slice(1))
        .join(' ') || series;
}

export function parsePostAbstract(postPath: string, postsPath = POSTS_PATH) {
    const relative = path.relative(postsPath, postPath);
    const segments = relative.split(path.sep);
    if (path.isAbsolute(relative) || segments.length !== 4 || segments[3] !== 'content.mdx') {
        throw new Error(`${postPath}: expected {category}/{series}/{slug}/content.mdx inside ${postsPath}`);
    }
    const [categoryPath, seriesPath, slug] = segments.slice(0, 3).map(segment => validateSegment(segment, postPath));
    // Folder names are literal filesystem names, never URL-decoded strings.
    const url = `/posts/${[categoryPath, seriesPath, slug].map(segment => encodeURIComponent(segment)).join('/')}`;
    return { url, categoryPath, seriesPath, slug, seriesPublicName: getSeriesPublicName(seriesPath) };
}

export function getPostPath(category?: string, postsPath = POSTS_PATH) {
    if (category !== undefined) validateSegment(category, 'Category');
    // Validate every MDX file instead of silently ignoring a misplaced article.
    // Filter category names literally so glob characters in them are harmless.
    return sync('**/*.mdx', { cwd: postsPath, absolute: true, nodir: true }).sort()
        .filter(filePath => {
            const post = parsePostAbstract(filePath, postsPath);
            return category === undefined || post.categoryPath === category;
        });
}

export function resolvePostPath(category: string, series: string, slug: string, postsPath = POSTS_PATH) {
    // This helper accepts literal validated folder names, not URL params.
    const segments = [category, series, slug].map(segment => validateSegment(segment, 'Post route'));
    return path.join(postsPath, ...segments, 'content.mdx');
}

export function findPostPath(category: string, series: string, slug: string, postsPath = POSTS_PATH) {
    const params = [category, series, slug].map(segment => validateSegment(segment, 'Post route'));
    // Framework prerendering can supply encoded params while other callers supply
    // literal names. Only match existing files; never decode a parameter into a path.
    const matches = getPostPath(undefined, postsPath).filter(file => {
        const post = parsePostAbstract(file, postsPath);
        return [post.categoryPath, post.seriesPath, post.slug].every((name, index) =>
            params[index] === name || params[index] === encodeURIComponent(name)
        );
    });
    if (matches.length > 1) {
        throw new Error(`Ambiguous post route ${JSON.stringify(params)}: ${matches.join(', ')}. Rename folders whose literal names duplicate another folder's encoded name.`);
    }
    if (!matches.length) throw new Error(`Post not found in ${postsPath}: ${JSON.stringify(params)}`);
    const post = parsePostAbstract(matches[0], postsPath);
    return resolvePostPath(post.categoryPath, post.seriesPath, post.slug, postsPath);
}
