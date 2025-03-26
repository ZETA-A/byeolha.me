import PostBody from '@/components/post/PostBody';
import { parsePost, POSTS_PATH } from '@/utils/posts';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: '소개',
    description:
        '현실의 문제를 해결하기위해, 컴퓨터라는 도구를 사용하는 김승현 입니다.',
};

export default async function Resume() {
    const post = await parsePost(`${POSTS_PATH}/resume.mdx`);
    return (
        <div className="mdx">
            <PostBody post={post} />
        </div>
    );
}
