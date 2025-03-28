import PageHeader from '@/components/layout/PageHeader';
import ProjectList from '@/components/ProjectList';
import { siteConfig } from '@/config/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '작품',
    description: '작은 시도들이 모여 창작의 이야기를 엮어갑니다.',
    openGraph: {
        title: '작품',
        description: '작은 시도들이 모여 창작의 이야기를 엮어갑니다.',
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
        title: '작품',
        description: '작은 시도들이 모여 창작의 이야기를 엮어갑니다.',
        images: [`${siteConfig.url}${siteConfig.defaultThumbnail}`],
    },
};

export default function Project() {
    return (
        <div>
            <PageHeader
                title="작품"
                catchphrase="작은 시도들이 모여 창작의 이야기를 엮어갑니다."
            />
            <ProjectList />
        </div>
    );
}
