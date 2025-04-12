import PageHeader from '@/components/layout/PageHeader';
import ProjectList from '@/components/ProjectList';
import { siteConfig } from '@/config/config';
import { Metadata } from 'next';
import { Fade } from 'react-awesome-reveal';

export const metadata: Metadata = {
    title: '작품',
    description: '작은 시도들이 모여 창작의 이야기를 엮어갑니다.',
    openGraph: {
        title: '작품',
        description: '작은 시도들이 모여 창작의 이야기를 엮어갑니다.',
        url: '/project',
        images: [
            {
                url: `${siteConfig.defaultThumbnail}`,
                width: 800,
                height: 600,
            },
        ],
    },
    twitter: {
        title: '작품',
        description: '작은 시도들이 모여 창작의 이야기를 엮어갑니다.',
        card: 'summary_large_image',
        images: [`${siteConfig.defaultThumbnail}`],
    },
};

export default function Project() {
    return (
        <div>
            <Fade cascade damping={0.3} duration={600} triggerOnce>
                <PageHeader
                    title="작품"
                    catchphrase="작은 시도들이 모여 창작의 이야기를 엮어갑니다."
                />
                <ProjectList />
            </Fade>
        </div>
    );
}
