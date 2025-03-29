import PageHeader from '@/components/layout/PageHeader';
import PostList from '@/components/post/PostList';
import { siteConfig } from '@/config/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '일기',
    description:
        '매일의 소중한 순간들이 모여 하루를 특별한 이야기로 완성합니다.',
    openGraph: {
        title: '일기',
        description:
            '매일의 소중한 순간들이 모여 하루를 특별한 이야기로 완성합니다.',
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
        title: '일기',
        description:
            '매일의 소중한 순간들이 모여 하루를 특별한 이야기로 완성합니다.',
        images: [`${siteConfig.url}${siteConfig.defaultThumbnail}`],
    },
};

export default function Diary() {
    return (
        <div>
            <PageHeader
                title="일기"
                catchphrase="매일의 소중한 순간들이 모여 하루를 특별한 이야기로 완성합니다."
            />
            <PostList category="diary" />
        </div>
    );
}
