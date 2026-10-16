import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Post, PostMatter } from '@/config/types';
import readingTime from 'reading-time';
import { formatPostDate, normalizePostMatter, postYear } from './postMatter';
import { load, JSON_SCHEMA } from 'js-yaml';
import { siteConfig } from '@/config/config';
import extractKeywords from './extractKeywords';

import { getPostPath, parsePostAbstract, findPostPath } from './postPaths';
export { BASE_PATH, POSTS_PATH, getPostPath, parsePostAbstract, getSeriesPublicName } from './postPaths';

export const RESUME_PATH = path.join(process.cwd(), 'app/resume/content.mdx');

export async function parsePost(postPath: string): Promise<Post> {
    const postAbstract = parsePostAbstract(postPath);
    const postDetail = await parsePostDetail(postPath);
    return { ...postAbstract, ...postDetail };
}

// MDX 파일의 상세내용 파싱
export async function parsePostDetail(postPath: string) {
    const file = fs.readFileSync(postPath, 'utf8');
    const { data, content } = matter(file, { engines: { yaml: (source) => load(source, { schema: JSON_SCHEMA }) as Record<string, unknown> } });
    const grayMatter = normalizePostMatter(data, postPath);
    const { createdAt, modifiedAt } = grayMatter;
    const generatedKeywords = getPostKeywords(grayMatter, content);
    const readingMinutes = Math.ceil(readingTime(content).minutes);
    const createDateDisplay = formatPostDate(createdAt);
    const modifiedDateDisplay = formatPostDate(modifiedAt);
    return {
        ...grayMatter,
        readingMinutes,
        content,
        createdAt,
        modifiedAt,
        createDateDisplay,
        modifiedDateDisplay,
        generatedKeywords,
    };
}

// post를 날짜 최신 순으로 정렬
function sortPostList(PostList: Post[]) {
    return PostList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

// 모든 포스트 목록 조회
export async function getPostList(category?: string): Promise<Post[]> {
    const paths: string[] = getPostPath(category);
    const posts = await Promise.all(
        paths.map((postPath) => parsePost(postPath))
    );
    return posts;
}

// 최신글 순서로 정렬
export async function getSortedPostList(category?: string) {
    const postList = await getPostList(category);
    const sortList = sortPostList(postList);
    return sortList;
}

// 년도별로 그룹화 하여 최신글 순서로 정렬
export async function getSortedPostListByYear(category?: string) {
    const postList = await getPostList(category);
    const sortList = sortPostList(postList);

    // 연도별로 그룹화
    const result = Object.entries(
        sortList.reduce((acc, post) => {
            const year = postYear(post.createdAt);
            if (!acc[year]) acc[year] = [];
            acc[year].push(post);
            return acc;
        }, {} as { [key: string]: Post[] })
    );

    // 내림차순 정렬
    const sortedList = result.sort((a, b) => Number(b[0]) - Number(a[0]));

    // 원하는 형태로 변환
    return sortedList.map(([year, post]) => ({
        year,
        post,
    }));
}

// post 상세 페이지 내용 조회
export const getPostDetail = async (
    category: string,
    series: string,
    slug: string
) => {
    const filePath = findPostPath(category, series, slug);
    const detail = await parsePost(filePath);
    return detail;
};

const getPostKeywords = (grayMatter: PostMatter, content: string) => {
    if (!grayMatter.keywords) {
        return extractKeywords(content, 5);
    } else {
        return grayMatter.keywords.split(',').map(word => word.trim()).filter(Boolean);
    }
};

// 사이트맵
export const getSitemapPostList = async () => {
    const postList = await getPostList();
    const baseUrl = siteConfig.url;
    const sitemapPostList = postList.map(({ url, modifiedAt }) => ({
        lastModified: modifiedAt,
        url: `${baseUrl}${url}`,
        changeFrequency: 'daily' as const,
    }));
    return sitemapPostList;
};
