import type { Element, Root, RootContent } from 'hast';

function textContent(node: RootContent): string {
    if (node.type === 'text') return node.value;
    return 'children' in node ? node.children.map(textContent).join('') : '';
}

function element(tagName: string, properties: Element['properties'], children: Element['children']): Element {
    return { type: 'element', tagName, properties, children };
}

// Run after rehype-slug so the TOC reuses the actual heading IDs, including duplicates.
export default function rehypePostToc({ enabled = true }: { enabled?: boolean } = {}) {
    return (tree: Root) => {
        if (!enabled) return;
        const headings: { id: string; title: string; depth: number }[] = [];
        const walk = (node: Root | RootContent) => {
            if (node.type === 'element' && ['h2', 'h3'].includes(node.tagName)) {
                const title = textContent(node).trim();
                const id = node.properties.id;
                if (typeof id === 'string' && title) headings.push({ id, title, depth: Number(node.tagName[1]) });
            }
            if ('children' in node) node.children.forEach(walk);
        };
        walk(tree);
        if (!headings.length) return;
        tree.children.unshift(element('details', { className: ['post-toc'] }, [
            element('summary', { ariaLabel: '글 목차' }, [{ type: 'text', value: '목차' }]),
            element('button', { type: 'button', className: ['toc-rail'], ariaLabel: '글 목차 열기' }, headings.map(heading =>
                element('span', { className: ['toc-marker', ...(heading.depth === 3 ? ['toc-marker-sub'] : [])], ariaHidden: 'true' }, [])
            )),
            element('nav', { ariaLabel: '글 목차' }, [
                element('ul', {}, headings.map(heading =>
                    element('li', { className: heading.depth === 3 ? ['toc-subheading'] : [] }, [
                        element('a', { href: `#${encodeURIComponent(heading.id)}` }, [{ type: 'text', value: heading.title }]),
                    ])
                )),
            ]),
        ]));
    };
}
