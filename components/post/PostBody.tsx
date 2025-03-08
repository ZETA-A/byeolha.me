import { Post } from '@/config/types';
import { MDXRemote } from 'next-mdx-remote/rsc';

import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const PostBody = ({ post }: { post: Post }) => {
    return (
        <MDXRemote
            source={post.content}
            options={{
                mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkBreaks],
                    rehypePlugins: [
                        rehypePrism,
                        rehypeSlug,
                        rehypeAutolinkHeadings,
                    ],
                },
            }}
        />
    );
};

export default PostBody;
