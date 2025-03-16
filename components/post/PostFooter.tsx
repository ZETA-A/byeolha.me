import { Post } from '@/config/types';
import Link from 'next/link';

export const PostFooter = ({
    post,
    thisPostUrl,
}: {
    post: Post[];
    thisPostUrl: string;
}) => {
    const thisPost = post.findIndex((post) => post.url === thisPostUrl);
    const previousPost =
        post.at(thisPost + 1) === undefined
            ? { url: '#', title: 'none' }
            : post.at(thisPost + 1);
    const nextPost =
        thisPost === 0 ? { url: '#', title: 'none' } : post.at(thisPost - 1);
    return (
        <div className="mt-16 font-sans">
            <p className="text-right text-xs pb-2">
                이 글은 크리에이티브 커먼스 라이선스 4.0을 준수합니다.
            </p>
            <hr />
            <div className="flex justify-between pt-2">
                <div className={previousPost?.url === '#' ? 'invisible' : ''}>
                    <Link href={`${previousPost?.url}`}>
                        <p className="text-xs text-gray-600">이전 글</p>
                        <p className="text-sm">{previousPost?.title}</p>
                    </Link>
                </div>
                <div className={nextPost?.url === '#' ? 'invisible' : ''}>
                    <Link href={`${nextPost?.url}`}>
                        <p className="text-right text-xs text-gray-600">
                            다음 글
                        </p>
                        <p className="text-sm">{nextPost?.title}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostFooter;
