import PageHeader from '@/components/layout/PageHeader';
import PostList from '@/components/post/PostList';
import { siteConfig } from '@/config/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '노트',
    description: '함께 배우고 기록하는 공간으로 초대합니다.',
    openGraph: {
        title: '노트',
        description: '함께 배우고 기록하는 공간으로 초대합니다.',
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
        title: '노트',
        description: '함께 배우고 기록하는 공간으로 초대합니다.',
        images: [`${siteConfig.url}${siteConfig.defaultThumbnail}`],
    },
};
export default function Note() {
    return (
        <div>
            <PageHeader
                title="노트"
                catchphrase="함께 배우고 기록하는 공간으로 초대합니다."
            />
            <PostList category="note" />
        </div>
    );
}
