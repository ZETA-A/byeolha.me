import { Post } from '@/config/types';
import { MDXRemote } from 'next-mdx-remote/rsc';

import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeFigure from '@microflash/rehype-figure';

const PostBody = ({ post }: { post: Post }) => {
    return (
        <MDXRemote
            source={post.content}
            options={{
                mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkBreaks, remarkToc],
                    rehypePlugins: [
                        rehypeFigure,
                        rehypeCodeTitles,
                        [
                            rehypePrettyCode,
                            {
                                theme: 'material-theme-lighter',
                            },
                        ],
                        rehypeSlug,
                        [
                            rehypeExternalLinks,
                            {
                                properties: {
                                    className: ['external-link'],
                                },
                                target: '_blank',
                                rel: ['noopener noreferrer'],
                            },
                        ],
                        [
                            rehypeAutolinkHeadings,
                            {
                                behavior: 'wrap',
                                properties: {
                                    className: ['anchor'],
                                },
                            },
                        ],
                    ],
                },
            }}
        />
    );
};

export default PostBody;
