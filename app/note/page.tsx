import PageHeader from '@/components/layout/PageHeader';
import PostList from '@/components/post/PostList';

export default function Note() {
    return (
        <div>
            <PageHeader
                title="노트"
                catchphrase="함께 배우고 기록하는 공간으로 초대할게요."
            />
            <PostList category="note" />
        </div>
    );
}
