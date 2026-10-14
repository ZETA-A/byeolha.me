import type { Root, RootContent } from 'hast';

// Markdown image titles can opt into sizing: ![alt](src "width=400")
export default function rehypeImageSize() {
    return (tree: Root) => {
        const resizeImages = (node: Root | RootContent) => {
            if (node.type === 'element' && node.tagName === 'img') {
                const title = node.properties.title;
                const match = typeof title === 'string'
                    ? /^width=(\d+(?:\.\d+)?)(px|%)?$/.exec(title.trim())
                    : null;

                if (match && Number(match[1]) > 0) {
                    const width = `${match[1]}${match[2] ?? 'px'}`;
                    const existingStyle = typeof node.properties.style === 'string'
                        ? node.properties.style
                        : '';

                    node.properties.style = `${existingStyle}${existingStyle ? ';' : ''}width:${width};max-width:100%;height:auto`;
                    delete node.properties.title;
                }
            }

            if ('children' in node) {
                node.children.forEach(resizeImages);
            }
        };

        resizeImages(tree);
    };
}
