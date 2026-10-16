import path from 'node:path';
import fs from 'node:fs';
import { cache } from 'react';
import type { Post, PostSummary } from '@/config/types';
import { postYear } from './postMatter';
import { parsePostSource, summarizePost, enrichPost, formatPostTitle } from './postContent';
import { siteConfig } from '@/config/config';
import { getPostPath as discoverPostPaths, parsePostAbstract, findPostPath, validatePostSegment } from './postPaths';
export { BASE_PATH, POSTS_PATH, parsePostAbstract, getSeriesPublicName } from './postPaths';

export const RESUME_PATH = path.join(process.cwd(), 'app/resume/content.mdx');

// React cache reuses data within a Server Component render, not across requests.
const getAllPostPaths = cache(() => discoverPostPaths());
export const getPostPath = cache((category?: string) => {
    if (category !== undefined) validatePostSegment(category, 'Category');
    const paths = getAllPostPaths();
    return category === undefined ? paths : paths.filter(file => parsePostAbstract(file).categoryPath === category);
});

const readPostSource = cache((postPath: string) =>
    parsePostSource(fs.readFileSync(postPath, 'utf8'), postPath)
);

export const parsePostDetail = cache(async (postPath: string) => enrichPost(readPostSource(postPath)));

export const parsePost = cache(async (postPath: string): Promise<Post> => {
    const abstract = parsePostAbstract(postPath);
    const detail = await parsePostDetail(postPath);
    return {
        ...abstract,
        ...detail,
        title: formatPostTitle(detail.title, abstract.seriesPublicName),
    };
});

const parsePostSummary = cache(async (postPath: string): Promise<PostSummary> => {
    const abstract = parsePostAbstract(postPath);
    const summary = summarizePost(readPostSource(postPath));
    return {
        ...abstract,
        ...summary,
        title: formatPostTitle(summary.title, abstract.seriesPublicName),
    };
});

export const getPostSummaryList = cache(async (category?: string): Promise<PostSummary[]> =>
    Promise.all(getPostPath(category).map(parsePostSummary))
);

// post를 날짜 최신 순으로 정렬
function sortPostList(postList: PostSummary[]) {
    return [...postList].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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
    const postList = await getPostSummaryList(category);
    const sortList = sortPostList(postList);
    return sortList;
}

// 년도별로 그룹화 하여 최신글 순서로 정렬
export async function getSortedPostListByYear(category?: string) {
    const postList = await getPostSummaryList(category);
    const sortList = sortPostList(postList);

    // 연도별로 그룹화
    const result = Object.entries(
        sortList.reduce((acc, post) => {
            const year = postYear(post.createdAt);
            if (!acc[year]) acc[year] = [];
            acc[year].push(post);
            return acc;
        }, {} as { [key: string]: PostSummary[] })
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
export const getPostDetail = cache(async (
    category: string,
    series: string,
    slug: string
) => {
    const filePath = findPostPath(category, series, slug, undefined, getAllPostPaths());
    return parsePost(filePath);
});

// 사이트맵
export const getSitemapPostList = async () => {
    const postList = await getPostSummaryList();
    const baseUrl = siteConfig.url;
    const sitemapPostList = postList.map(({ url, modifiedAt }) => ({
        lastModified: modifiedAt,
        url: `${baseUrl}${url}`,
        changeFrequency: 'daily' as const,
    }));
    return sitemapPostList;
};
