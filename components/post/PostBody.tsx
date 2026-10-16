import { MDXRemote } from 'next-mdx-remote/rsc';

import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypePostToc from '@/utils/rehypePostToc';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeFigure from '@microflash/rehype-figure';
import rehypeImageSize from '@/utils/rehypeImageSize';
import PostImage from './PostImage';
import PostToc from './PostToc';
import PostTable from './PostTable';
import { codeThemeOptions } from '@/utils/codeTheme';

const PostBody = ({ content, showToc = false }: { content: string; showToc?: boolean }) => {
    return (
        <MDXRemote
            source={content}
            components={{ details: PostToc, img: PostImage, table: PostTable }}
            options={{
                mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkBreaks],
                    rehypePlugins: [
                        rehypeImageSize,
                        rehypeFigure,
                        rehypeCodeTitles,
                        [rehypePrettyCode, codeThemeOptions],
                        rehypeSlug,
                        [rehypePostToc, { enabled: showToc }],
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
