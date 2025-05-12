import Giscus from '@/components/Giscus';
import PostBody from '@/components/post/PostBody';
import PostFooter from '@/components/post/PostFooter';
import PostHeader from '@/components/post/PostHeader';
import { siteConfig } from '@/config/config';
import extractKeywords from '@/utils/extractKeywords';
import {
    getPostDetail,
    getPostPath,
    getSortedPostList,
    parsePostAbstract,
} from '@/utils/posts';
import removeMD from '@/utils/removeMD';
import { Metadata } from 'next';
import { Fade } from 'react-awesome-reveal';

type Props = {
    params: Promise<{ category: string; series: string; slug: string }>;
};

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category, series, slug } = await params;
    const post = await getPostDetail(category, series, slug);
    const thumbnail = post.thumbnail || `${siteConfig.defaultThumbnail}`;
    const description = post.description || removeMD(post.content, 140);
    return {
        title: post.title,
        description: description,
        alternates: {
            canonical: `${siteConfig.url}/posts/${category}/${series}/${slug}`,
        },
        keywords: post.generatedKeywords,
        openGraph: {
            title: post.title,
            description: description,
            url: post.url,
            images: [
                {
                    url: thumbnail,
                    width: 800,
                    height: 600,
                },
            ],
            type: 'article',
            publishedTime: post.createDateString,
            modifiedTime: post.modifiedDateString,
            authors: siteConfig.author.name,
        },
        twitter: {
            title: post.title,
            description: description,
            images: [thumbnail],
        },
    };
}

export function generateStaticParams() {
    const postPaths: string[] = getPostPath();
    const paramList = postPaths
        .map((path) => parsePostAbstract(path))
        .map((item) => ({
            category: item.categoryPath,
            series: item.seriesPath,
            slug: item.slug,
        }));
    return paramList;
}

const PostDetail = async ({ params }: Props) => {
    const { category, series, slug } = await params;
    const post = await getPostDetail(category, series, slug);
    const sortedPost = await getSortedPostList(category);
    return (
        <article>
            <PostHeader post={post} />
            <Fade cascade duration={300} triggerOnce>
                <div className="max-w-none mdx">
                    <PostBody post={post} />
                </div>
                <PostFooter post={sortedPost} thisPostUrl={post.url} />
                <Giscus />
            </Fade>
        </article>
    );
};

export default PostDetail;
