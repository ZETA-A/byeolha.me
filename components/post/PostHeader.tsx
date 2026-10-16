import Link from 'next/link';
import { seriesUrl } from '@/utils/series';
import { Post } from '@/config/types';

export default function PostHeader({ post }: { post: Post }) {
    const prefix = `(${post.seriesPublicName})`;
    const title = post.title.startsWith(`${prefix} `) ? post.title.slice(prefix.length + 1) : post.title;
    return (
        <div className="flex flex-col gap-1 mb-20">
            <h1 className="font-semibold [overflow-wrap:anywhere]"><Link href={seriesUrl(post.categoryPath, post.seriesPath)} aria-label={`${post.seriesPublicName} 시리즈 보기`} className="rounded-sm hover:underline focus-visible:outline-2">{prefix}</Link>{' '}{title}</h1>
            <p className="text-sm text-second">
                {post.createDateDisplay} · {post.readingMinutes}min
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
