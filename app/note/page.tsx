import { pageMetadata } from '@/utils/metadata';
import PageHeader from '@/components/layout/PageHeader';
import PostList from '@/components/post/PostList';
import { Metadata } from 'next';

export const metadata: Metadata = {
    ...pageMetadata(
        '노트',
        '함께 배우고 기록하는 공간으로 초대합니다.',
        '/note'
    ),
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
