import { pageMetadata } from '@/utils/metadata';
import PostBody from '@/components/post/PostBody';
import { parsePostDetail, RESUME_PATH } from '@/utils/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    ...pageMetadata(
        '소개',
        '현실의 문제를 해결하기 위해, 컴퓨터라는 도구를 사용하는 김승현입니다.',
        '/resume'
    ),
};

export default async function Resume() {
    const post = await parsePostDetail(RESUME_PATH);
    return (
        <div className="mdx resume">
            <PostBody content={post.content} />
        </div>
    );
}
