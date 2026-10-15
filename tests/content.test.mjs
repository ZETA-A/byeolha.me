import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { globSync } from 'node:fs';
import matter from 'gray-matter';
import { load, JSON_SCHEMA } from 'js-yaml';
import { normalizePostMatter, parsePostDate, postYear, formatPostDate } from '../utils/postMatter.ts';

const valid = { title: '글', createDate: '2026-03-16 11:00:00', modifiedDate: '2026-03-16 11:00:00' };
test('dates reject missing values, impossible calendar dates and times', () => {
    for (const value of [undefined, null, '', new Date(), '2026-02-31', '2025-02-29', '2026-13-01', '2026-01-01 24:00:00']) {
        assert.throws(() => parsePostDate(value, 'test.mdx', 'createDate'));
    }
    assert.equal(parsePostDate('2024-02-29', 'test', 'date').toISOString(), '2024-02-28T15:00:00.000Z');
});
test('Seoul dates and years stay consistent across build timezones', () => {
    const date = parsePostDate('2026-01-01', 'test', 'date');
    assert.equal(date.toISOString(), '2025-12-31T15:00:00.000Z');
    assert.equal(postYear(date), '2026');
    assert.equal(formatPostDate(date), 'Jan 01, 2026');
});
test('frontmatter validates required and optional fields and date ordering', () => {
    assert.throws(() => normalizePostMatter({ ...valid, title: null }, 'test'));
    assert.throws(() => normalizePostMatter({ ...valid, keywords: [] }, 'test'));
    assert.throws(() => normalizePostMatter({ ...valid, modifiedDate: '2026-03-16' }, 'test'));
    const post = normalizePostMatter({ ...valid, description: null, thumbnail: '  ', keywords: 'React, Next.js' }, 'test');
    assert.equal(post.description, undefined);
    assert.equal(post.thumbnail, undefined);
    assert.equal(post.title, '글');
});
test('all repository content passes the same frontmatter validation', () => {
    for (const file of [...globSync('posts/**/*.mdx'), 'app/resume/content.mdx']) {
        const { data } = matter(fs.readFileSync(file, 'utf8'), { engines: { yaml: source => load(source, { schema: JSON_SCHEMA }) } });
        normalizePostMatter(data, file);
    }
});
