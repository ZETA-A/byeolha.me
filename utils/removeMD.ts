import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMdx from 'remark-mdx';
import remarkMath from 'remark-math';
import type { Root, RootContent } from 'mdast';

const parser = unified().use(remarkParse).use(remarkGfm).use(remarkMath).use(remarkMdx);
const excluded = new Set(['code', 'image', 'imageReference', 'definition', 'footnoteDefinition', 'footnoteReference', 'mdxjsEsm', 'mdxTextExpression', 'mdxFlowExpression']);
const inlineContainers = new Set(['paragraph', 'heading', 'emphasis', 'strong', 'delete', 'link', 'linkReference', 'mdxJsxTextElement']);

function plainText(node: Root | RootContent): string {
    if (excluded.has(node.type)) return '';
    if (node.type === 'text' || node.type === 'inlineCode') return node.value;
    if (node.type === 'break') return ' ';
    if ('children' in node) {
        return node.children.map(plainText).join(inlineContainers.has(node.type) ? '' : ' ');
    }
    return '';
}

export default function removeMD(content: string, limit: number): string {
    const text = plainText(parser.parse(content)).replace(/\s+/g, ' ').trim();
    const characters = Array.from(text);
    const length = Math.max(0, Math.floor(limit));
    if (!length) return '';
    return characters.length > length ? characters.slice(0, length).join('').trimEnd() + '...' : text;
}
