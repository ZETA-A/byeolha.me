import { Post } from '@/config/types';
import PageHeader from '../layout/PageHeader';

export default function PostHeader({ post }: { post: Post }) {
    return (
        <div className="mb-8">
            <h1>{post.title}</h1>
            <p className="text-sm">
                {post.dateString} · {post.readingMinutes}min
            </p>
            <p className="text-sm">{post.seriesPublicName}</p>
        </div>
    );
}
