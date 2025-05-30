import path from 'path';
import { sync } from 'glob';
import fs from 'fs';
import matter from 'gray-matter';
import { Post, PostMatter } from '@/config/types';
import readingTime from 'reading-time';
import dayjs from 'dayjs';
import { siteConfig } from '@/config/config';
import extractKeywords from './extractKeywords';

export const BASE_PATH = 'posts';
export const POSTS_PATH = path.join(process.cwd(), BASE_PATH);
export const RESUME_PATH = path.join(process.cwd(), 'app/resume/content.mdx');

// 모든 MDX 파일 조회
export function getPostPath(category?: string) {
    const folder = category || '**';
    const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
    return postPaths;
}

export async function parsePost(postPath: string): Promise<Post> {
    const postAbstract = parsePostAbstract(postPath);
    const postDetail = await parsePostDetail(postPath);
    return { ...postAbstract, ...postDetail };
}

// MDX 파일의 개요 파싱
export function parsePostAbstract(postPath: string) {
    const filePath = postPath
        .slice(postPath.indexOf(BASE_PATH))
        .replace(`${BASE_PATH}/`, '')
        .replace('.mdx', '');
    const [categoryPath, seriesPath, slug] = filePath.split('/');
    const decodedSeriesPath = decodeURIComponent(seriesPath);
    const decodedSlug = decodeURIComponent(slug);
    const url = `/posts/${categoryPath}/${decodedSeriesPath}/${decodedSlug}`;
    const seriesPublicName = getSeriesPublicName(seriesPath);
    return { url, categoryPath, seriesPath, seriesPublicName, slug };
}

// MDX 파일의 상세내용 파싱
export async function parsePostDetail(postPath: string) {
    const file = fs.readFileSync(postPath, 'utf8');
    const { data, content } = matter(file);
    const grayMatter = data as PostMatter;
    const generatedKeywords = getPostKeywords(grayMatter, content);
    const readingMinutes = Math.ceil(readingTime(content).minutes);
    const createDateString = dayjs(grayMatter.createDate).format(
        'MMM DD, YYYY'
    );
    const modifiedDateString = dayjs(grayMatter.modifiedDate).format(
        'MMM DD, YYYY'
    );
    return {
        ...grayMatter,
        readingMinutes,
        content,
        createDateString,
        modifiedDateString,
        generatedKeywords,
    };
}

// category folder name을 public name으로 변경 : dir_name -> Dir Name
export function getSeriesPublicName(dirPath: string) {
    return dirPath
        .split('_')
        .map((token) => token[0].toUpperCase() + token.slice(1, token.length))
        .join(' ');
}

// post를 날짜 최신 순으로 정렬
function sortPostList(PostList: Post[]) {
    return PostList.sort((a, b) => (a.createDate > b.createDate ? -1 : 1));
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
            const year = post.createDate.getFullYear().toString();
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
    const decodedSeries = decodeURIComponent(series);
    const decodedSlug = decodeURIComponent(slug);
    const filePath = `${POSTS_PATH}/${category}/${decodedSeries}/${decodedSlug}/content.mdx`;
    const detail = await parsePost(filePath);
    return detail;
};

const getPostKeywords = (grayMatter: PostMatter, content: string) => {
    if (grayMatter.keywords === null || grayMatter.keywords === undefined) {
        return extractKeywords(content, 5);
    } else {
        return grayMatter.keywords.split(', ');
    }
};

// 사이트맵
export const getSitemapPostList = async () => {
    const postList = await getPostList();
    const baseUrl = siteConfig.url;
    const sitemapPostList = postList.map(({ url, modifiedDateString }) => ({
        lastModified: new Date(modifiedDateString),
        url: `${baseUrl}${url}`,
        changeFrequency: 'daily' as 'daily',
    }));
    return sitemapPostList;
};
