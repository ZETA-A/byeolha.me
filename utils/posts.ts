import path from 'path';
import { sync } from 'glob';
import fs from 'fs';
import matter from 'gray-matter';
import { Post, PostMatter } from '@/config/types';
import readingTime from 'reading-time';
import dayjs from 'dayjs';

const BASE_PATH = 'posts';
const POSTS_PATH = path.join(process.cwd(), BASE_PATH);

// 모든 MDX 파일 조회
export function getPostPath(category?: string) {
    const folder = category || '**';
    const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`);
    return postPaths;
}

async function parsePost(postPath: string): Promise<Post> {
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
    const url = `/post/${seriesPath}/${slug}`;
    const seriesPublicName = getSeriesPublicName(seriesPath);

    return { url, categoryPath, seriesPath, seriesPublicName, slug };
}

// MDX 파일의 상세내용 파싱
async function parsePostDetail(postPath: string) {
    const file = fs.readFileSync(postPath, 'utf8');
    const { data, content } = matter(file);
    const grayMatter = data as PostMatter;
    const readingMinutes = Math.ceil(readingTime(content).minutes);
    const dateString = dayjs(grayMatter.date).format('MMM DD, YYYY');
    return { ...grayMatter, readingMinutes, content, dateString };
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
    return PostList.sort((a, b) => (a.date > b.date ? -1 : 1));
}

// 모든 포스트 목록 조회
export async function getPostList(category?: string): Promise<Post[]> {
    const paths: string[] = getPostPath(category);
    const posts = await Promise.all(
        paths.map((postPath) => parsePost(postPath))
    );
    return posts;
}

export async function getSortedPostList(category?: string) {
    const postList = await getPostList(category);

    const result = Object.entries(
        postList.reduce((acc, post) => {
            const year = post.date.getFullYear().toString();
            if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(post);
            return acc;
        }, {} as { [key: string]: Post[] })
    );

    // {year, post} 형태로 결과 변환
    return result.map(([year, post]) => ({
        year,
        post,
    }));
}
