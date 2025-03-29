import PostBody from '@/components/post/PostBody';
import { parsePostDetail, RESUME_PATH } from '@/utils/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '소개',
    description:
        '제 인생의 가장 소중한 일부분을 간략하게 엿볼 수 있는 곳 입니다.',
    openGraph: {
        title: '소개',
        description:
            '제 인생의 가장 소중한 일부분을 간략하게 엿볼 수 있는 곳 입니다.',
        url: '/resume',
    },
    twitter: {
        title: '소개',
        description:
            '제 인생의 가장 소중한 일부분을 간략하게 엿볼 수 있는 곳 입니다.',
    },
};

export default async function Resume() {
    const post = await parsePostDetail(RESUME_PATH);
    return (
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
    );
}
