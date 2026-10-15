import { pageMetadata } from '@/utils/metadata';
import PageHeader from '@/components/layout/PageHeader';
import PostList from '@/components/post/PostList';
import { Metadata } from 'next';

export const metadata: Metadata = {
    ...pageMetadata(
        '일기',
        '매일의 소중한 순간들이 모여 하루를 특별한 이야기로 완성합니다.',
        '/diary'
    ),
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
