import PostBody from '@/components/post/PostBody';
import { siteConfig } from '@/config/config';
import { parsePostDetail, RESUME_PATH } from '@/utils/posts';
import { Metadata } from 'next';
import { Fade } from 'react-awesome-reveal';

export const metadata: Metadata = {
    title: '소개',
    description:
        '현실의 문제를 해결하기위해, 컴퓨터라는 도구를 사용하는 김승현 입니다.',
    alternates: {
        canonical: `${siteConfig.url}/resume`,
    },
    openGraph: {
        title: '소개',
        description:
            '현실의 문제를 해결하기위해, 컴퓨터라는 도구를 사용하는 김승현 입니다.',
        url: '/resume',
        images: [
            {
                url: `${siteConfig.defaultThumbnail}`,
                width: 800,
                height: 600,
            },
        ],
    },
    twitter: {
        title: '소개',
        description:
            '현실의 문제를 해결하기위해, 컴퓨터라는 도구를 사용하는 김승현 입니다.',
        card: 'summary_large_image',
        images: [`${siteConfig.defaultThumbnail}`],
    },
};

export default async function Resume() {
    const post = await parsePostDetail(RESUME_PATH);
    return (
        <Fade cascade duration={300} triggerOnce>
            <div className="mdx">
                <PostBody
                    post={{
                        ...post,
                        url: '',
                        slug: '',
                        categoryPath: '',
                        seriesPath: '',
                        seriesPublicName: '',
                    }}
                />
            </div>
        </Fade>
    );
}
