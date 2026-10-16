import path from 'node:path';
import sharp from 'sharp';
import type { Root, RootContent } from 'hast';

const publicPath = path.join(process.cwd(), 'public');

async function localImageDimensions(src: string) {
    // Root-relative URLs map to public/. External and inline images are left alone.
    if (!src.startsWith('/') || src.startsWith('//')) return;
    const pathname = decodeURIComponent(src.split(/[?#]/, 1)[0]);
    const filePath = path.resolve(publicPath, `.${pathname}`);
    const relative = path.relative(publicPath, filePath);
    if (relative.startsWith(`..${path.sep}`) || relative === '..' || path.isAbsolute(relative)) {
        throw new Error(`Image path must stay inside public/: ${src}`);
    }
    try {
        const metadata = await sharp(filePath).metadata();
        // Browsers apply EXIF orientation; use the displayed dimensions as well.
        const rotated = metadata.orientation != null && metadata.orientation >= 5;
        const width = rotated ? metadata.height : metadata.width;
        const height = rotated ? metadata.width : metadata.height;
        if (!width || !height) throw new Error('Image dimensions are unavailable');
        return { width, height };
    } catch (cause) {
        throw new Error(`Cannot read local image dimensions: ${src}`, { cause });
    }
}

// Markdown image titles can opt into sizing: ![alt](src "width=400")
export default function rehypeImageSize() {
    return async (tree: Root) => {
        const resizeImages = async (node: Root | RootContent): Promise<void> => {
            if (node.type === 'element' && node.tagName === 'img') {
                const dimensions = typeof node.properties.src === 'string'
                    ? await localImageDimensions(node.properties.src)
                    : undefined;
                if (dimensions) {
                    node.properties.width = dimensions.width;
                    node.properties.height = dimensions.height;
                }

                const title = node.properties.title;
                const match = typeof title === 'string'
                    ? /^width=(\d+(?:\.\d+)?)(px|%)?$/.exec(title.trim())
                    : null;
                const existingStyle = typeof node.properties.style === 'string'
                    ? node.properties.style
                    : '';
                const styles = existingStyle ? [existingStyle] : [];

                if (match && Number(match[1]) > 0) {
                    styles.push(`width:${match[1]}${match[2] ?? 'px'}`, 'max-width:100%');
                    delete node.properties.title;
                }
                // Keep the intrinsic aspect ratio when CSS or a title overrides width.
                if (dimensions || (match && Number(match[1]) > 0)) styles.push('height:auto');
                if (styles.length) node.properties.style = styles.join(';');
            }

            if ('children' in node) {
                await Promise.all(node.children.map(resizeImages));
            }
        };
        await resizeImages(tree);
    };
}
