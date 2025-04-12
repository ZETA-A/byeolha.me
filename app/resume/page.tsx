import PostBody from '@/components/post/PostBody';
import { siteConfig } from '@/config/config';
import { parsePostDetail, RESUME_PATH } from '@/utils/posts';
import { Metadata } from 'next';
import { Fade } from 'react-awesome-reveal';

export const metadata: Metadata = {
    title: '소개',
    description:
        '제 인생의 가장 소중한 일부분을 간략하게 엿볼 수 있는 곳 입니다.',
    openGraph: {
        title: '소개',
        description:
            '제 인생의 가장 소중한 일부분을 간략하게 엿볼 수 있는 곳 입니다.',
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
            '제 인생의 가장 소중한 일부분을 간략하게 엿볼 수 있는 곳 입니다.',
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
