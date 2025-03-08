import { Post } from '@/config/types';
import PageHeader from '../layout/PageHeader';

export default function PostHeader({ post }: { post: Post }) {
    return (
        <div className="mb-8">
            <h1>{post.title}</h1>
            <p className="mb-0.5">
                {post.dateString} · {post.readingMinutes}min
            </p>
            <p>{post.seriesPublicName}</p>
        </div>
    );
}
