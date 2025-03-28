import PostBody from '@/components/post/PostBody';
import { parsePost, POSTS_PATH } from '@/utils/posts';
import { siteConfig } from '@/config/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '소개',
    description: '당신을 만난 것은 오늘 제게있어 행운이었습니다.',
    openGraph: {
        title: '소개',
        description: '당신을 만난 것은 오늘 제게있어 행운이었습니다.',
        url: `${siteConfig.url}`,
        images: [
            {
                url: `${siteConfig.url}${siteConfig.defaultThumbnail}`,
                width: 800,
                height: 600,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '소개',
        description: '당신을 만난 것은 오늘 제게있어 행운이었습니다.',
        images: [`${siteConfig.url}${siteConfig.defaultThumbnail}`],
    },
};

export default async function Resume() {
    const post = await parsePost(
        `${POSTS_PATH}/other/resume/resume/content.mdx`
    );
    return (
        <div className="mdx">
            <PostBody post={post} />
        </div>
    );
}
