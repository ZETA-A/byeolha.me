import PostBody from '@/components/post/PostBody';
import PostFooter from '@/components/post/PostFooter';
import PostHeader from '@/components/post/PostHeader';
import {
    getPostDetail,
    getPostPath,
    getSortedPostList,
    parsePostAbstract,
} from '@/utils/posts';
import { Metadata } from 'next';

type Props = {
    params: Promise<{ category: string; series: string; slug: string }>;
};

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category, series, slug } = await params;
    const post = await getPostDetail(category, series, slug);
    return {
        description: post.description,
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
            <div className="max-w-none mdx">
                <PostBody post={post} />
            </div>
            <PostFooter post={sortedPost} thisPostUrl={post.url} />
        </article>
    );
};

export default PostDetail;
