import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeFigure from '@microflash/rehype-figure';
import rehypeImageSize from '../utils/rehypeImageSize.ts';

function image(src, title) {
    const img = { type: 'element', tagName: 'img', properties: { src, alt: '사진 설명', ...(title ? { title } : {}) }, children: [] };
    return { img, tree: { type: 'root', children: [img] } };
}
const local = '/posts/note/Next.js/Hydration/1.png';
test('local Markdown images receive the original dimensions without losing alt text', async () => {
    const { img, tree } = image(`${local}?v=1#photo`);
    await rehypeImageSize()(tree);
    const metadata = await sharp(`public${local}`).metadata();
    assert.equal(img.properties.width, metadata.width);
    assert.equal(img.properties.height, metadata.height);
    assert.equal(img.properties.alt, '사진 설명');
    assert.equal(img.properties.style, 'height:auto');
});
test('width titles and ordinary captions are preserved through the figure pipeline', async () => {
    for (const title of ['width=400', 'width=50%', '사진 캡션']) {
        const tree = await unified().use(remarkParse).use(remarkRehype)
            .use(rehypeImageSize).use(rehypeFigure)
            .run(unified().use(remarkParse).parse(`![사진 설명](${local} "${title}")`));
        const output = JSON.stringify(tree);
        assert.ok(output.includes('사진 설명'));
        assert.ok(output.includes('"height":'));
        if (title.startsWith('width=')) {
            assert.ok(output.includes(`width:${title.slice(6)}${title === 'width=400' ? 'px' : ''}`));
            assert.ok(!output.includes('"title":"width='));
        } else {
            assert.ok(output.includes('사진 캡션'));
        }
    }
});
test('external, protocol-relative and inline images do not trigger local reads', async () => {
    for (const src of ['https://example.com/photo.jpg', '//example.com/photo.jpg', 'data:image/png;base64,abc']) {
        const { img, tree } = image(src);
        await rehypeImageSize()(tree);
        assert.equal(img.properties.width, undefined);
        assert.equal(img.properties.height, undefined);
    }
});
test('missing images and paths outside public fail with a source-specific error', async () => {
    for (const src of ['/missing-image.png', '/%2e%2e/package.json']) {
        await assert.rejects(rehypeImageSize()(image(src).tree), /public|missing-image/);
    }
});
test('EXIF-rotated photos use the browser-visible aspect ratio', async () => {
    const folder = await fs.mkdtemp(path.join(process.cwd(), 'public', '.image-test-'));
    try {
        const file = path.join(folder, 'rotated.jpg');
        await sharp({ create: { width: 30, height: 20, channels: 3, background: '#fff' } }).jpeg().withMetadata({ orientation: 6 }).toFile(file);
        const { img, tree } = image(`/${path.relative(path.join(process.cwd(), 'public'), file)}`);
        await rehypeImageSize()(tree);
        assert.equal(img.properties.width, 20);
        assert.equal(img.properties.height, 30);
    } finally {
        await fs.rm(folder, { recursive: true, force: true });
    }
});
