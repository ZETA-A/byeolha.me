import PageHeader from '@/components/layout/PageHeader';
import PostList from '@/components/post/PostList';
import { Metadata } from 'next';
import { Fade } from 'react-awesome-reveal';

export const metadata: Metadata = {
    title: '노트',
    description: '함께 배우고 기록하는 공간으로 초대합니다.',
    openGraph: {
        title: '노트',
        description: '함께 배우고 기록하는 공간으로 초대합니다.',
        url: '/note',
    },
    twitter: {
        title: '노트',
        description: '함께 배우고 기록하는 공간으로 초대합니다.',
    },
};
export default function Note() {
    return (
        <div>
            <Fade cascade damping={0.3} duration={600} triggerOnce>
                <PageHeader
                    title="노트"
                    catchphrase="함께 배우고 기록하는 공간으로 초대합니다."
                />
                <PostList category="note" />
            </Fade>
        </div>
    );
}
