import { Post } from '@/config/types';

export default function PostHeader({ post }: { post: Post }) {
    return (
        <div className="flex flex-col gap-1 mb-20">
            <h1 className="font-semibold">{post.title}</h1>
            <p className="text-sm text-second">
                {post.createDateString} · {post.readingMinutes}min
            </p>
            <p className="text-sm text-second">
                {post.generatedKeywords.map((keyword, idx) => {
                    return (
                        <span className="mr-1" key={`keywords-${idx}`}>
                            #{keyword}
                        </span>
                    );
                })}
            </p>
        </div>
    );
}
