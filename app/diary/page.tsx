import PageHeader from '@/components/layout/PageHeader';
import PostList from '@/components/post/PostList';
import { Metadata } from 'next';
import { Fade } from 'react-awesome-reveal';

export const metadata: Metadata = {
    title: '일기',
    description:
        '매일의 소중한 순간들이 모여 하루를 특별한 이야기로 완성합니다.',
    openGraph: {
        title: '일기',
        description:
            '매일의 소중한 순간들이 모여 하루를 특별한 이야기로 완성합니다.',
        url: '/diary',
    },
    twitter: {
        title: '일기',
        description:
            '매일의 소중한 순간들이 모여 하루를 특별한 이야기로 완성합니다.',
    },
};

export default function Diary() {
    return (
        <div>
            <Fade cascade damping={0.3} duration={600} triggerOnce>
                <PageHeader
                    title="일기"
                    catchphrase="매일의 소중한 순간들이 모여 하루를 특별한 이야기로 완성합니다."
                />
                <PostList category="diary" />
            </Fade>
        </div>
    );
}
