import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';
import { parsePostAbstract, resolvePostPath, getPostPath, getSeriesPublicName, findPostPath } from '../utils/postPaths.ts';

const root = path.join(os.tmpdir(), 'posts-project', 'nested-posts', 'posts');
test('article paths are relative to the posts root, regardless of ancestor names', () => {
    const file = path.join(root, 'note', 'Next.js', 'Hydration', 'content.mdx');
    const post = parsePostAbstract(file, root);
    assert.equal(post.url, '/posts/note/Next.js/Hydration');
    assert.equal(post.categoryPath, 'note');
    assert.equal(resolvePostPath(post.categoryPath, post.seriesPath, post.slug, root), file);
});
test('Korean, spaces, percent signs and URL delimiters round trip without double decoding', () => {
    for (const names of [
        ['일기', '여행 기록', '첫 글'],
        ['note', '100%_완료', '%2F'],
        ['note', 'A#B?C', '글%20이름'],
        ['note', 'Next__js', 'a.mdx.name'],
    ]) {
        const file = path.join(root, ...names, 'content.mdx');
        const post = parsePostAbstract(file, root);
        const params = new URL(post.url, 'https://example.com').pathname.split('/').slice(2).map(decodeURIComponent);
        assert.deepEqual(params, names);
        assert.equal(resolvePostPath(...params, root), file);
    }
    assert.equal(getSeriesPublicName('Next__js'), 'Next Js');
    assert.equal(getSeriesPublicName('___'), '___');
});
test('existing article URLs remain the same after normal URL encoding', () => {
    const files = getPostPath();
    assert.ok(files.length > 0);
    for (const file of files) {
        const post = parsePostAbstract(file);
        const [category, series, slug] = path.relative(path.join(process.cwd(), 'posts'), file).split(path.sep);
        const previousUrl = `/posts/${category}/${series}/${slug}`;
        // Existing URLs used plain Korean/ASCII folder names. Reserved URL
        // characters were previously broken and now intentionally get encoded.
        if (![category, series, slug].some(name => /[%#?]/.test(name))) {
            assert.equal(new URL(post.url, 'https://example.com').href, new URL(previousUrl, 'https://example.com').href);
        }
        assert.equal(resolvePostPath(category, series, slug), file);
    }
});
test('misplaced files and traversal paths report the original path', () => {
    for (const relative of ['content.mdx', 'note/series/content.mdx', 'note/series/slug/extra/content.mdx', 'note/series/slug/other.mdx', '../note/slug/content.mdx']) {
        const file = path.join(root, relative);
        assert.throws(() => parsePostAbstract(file, root), error => error.message.includes(file));
    }
    for (const segment of ['', ' ', '.', '..', '../outside', 'a/b', 'a\\b', 'a\0b']) {
        for (let i = 0; i < 3; i++) {
            const params = ['note', 'series', 'slug'];
            params[i] = segment;
            assert.throws(() => resolvePostPath(...params, root), /invalid post folder name/);
        }
    }
});
test('discovery validates misplaced MDX and treats category glob characters literally', () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'post-paths-'));
    try {
        for (const category of ['note', 'note*']) {
            const file = path.join(folder, category, 'series', 'slug', 'content.mdx');
            fs.mkdirSync(path.dirname(file), { recursive: true });
            fs.writeFileSync(file, 'test');
        }
        assert.equal(getPostPath(undefined, folder).length, 2);
        assert.equal(getPostPath('note*', folder).length, 1);
        assert.throws(() => getPostPath('../', folder), /invalid post folder name/);
        const misplaced = path.join(folder, 'note', 'misplaced.mdx');
        fs.writeFileSync(misplaced, 'test');
        assert.throws(() => getPostPath(undefined, folder), error => error.message.includes(misplaced));
    } finally {
        fs.rmSync(folder, { recursive: true, force: true });
    }
});

test('framework encoded params and literal names both resolve existing files safely', () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'post-routes-'));
    try {
        for (const names of [['일기', '여행 기록', '100%'], ['note', 'Next__js', '%2F'], ['note', 'A#B?C', '한글']]) {
            const file = resolvePostPath(...names, folder);
            fs.mkdirSync(path.dirname(file), { recursive: true });
            fs.writeFileSync(file, 'test');
            assert.equal(findPostPath(...names, folder), file);
            assert.equal(findPostPath(...names.map(encodeURIComponent), folder), file);
        }
        assert.throws(() => findPostPath('note', 'Next__js', 'missing', folder), /Post not found/);
        assert.throws(() => findPostPath('note', 'Next__js', '..', folder), /invalid post folder name/);
        for (const series of ['A B', 'A%20B']) {
            const file = resolvePostPath('note', series, 'slug', folder);
            fs.mkdirSync(path.dirname(file), { recursive: true });
            fs.writeFileSync(file, 'test');
        }
        assert.throws(() => findPostPath('note', 'A%20B', 'slug', folder), /Ambiguous post route/);
    } finally {
        fs.rmSync(folder, { recursive: true, force: true });
    }
});
