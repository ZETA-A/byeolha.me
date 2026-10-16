import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parsePostSource, summarizePost, enrichPost, formatPostTitle } from '../utils/postContent.ts';
import { getPostPath, parsePostAbstract } from '../utils/postPaths.ts';

const markdown = '---\ntitle: 테스트\ncreateDate: 2026-01-01\nmodifiedDate: 2026-01-02\nkeywords: React, Next.js\ndescription: 설명\n---\n\nReact와 Next.js를 학습합니다.\n';
test('summary preserves validated metadata without body-derived fields', () => {
    const source = parsePostSource(markdown, 'test.mdx');
    const summary = summarizePost(source);
    assert.equal(summary.title, '테스트');
    assert.equal(summary.createdAt.toISOString(), '2025-12-31T15:00:00.000Z');
    assert.equal(summary.modifiedDateDisplay, 'Jan 02, 2026');
    assert.equal(summary.description, '설명');
    for (const field of ['content', 'readingMinutes', 'generatedKeywords']) assert.ok(!(field in summary));
    assert.ok(source.content.includes('React와'));
});
test('full details retain body, reading time and explicitly supplied keywords', () => {
    const source = parsePostSource(markdown, 'test.mdx');
    const post = enrichPost(source);
    assert.equal(post.content, source.content);
    assert.equal(post.readingMinutes, 1);
    assert.deepEqual(post.generatedKeywords, ['React', 'Next.js']);
    assert.equal(post.createdAt, source.createdAt);
    assert.ok(!('generatedKeywords' in source));
});
test('summary and detailed metadata agree for every repository article', () => {
    for (const file of getPostPath()) {
        const source = parsePostSource(fs.readFileSync(file, 'utf8'), file);
        const summary = summarizePost(source);
        const full = enrichPost(source);
        for (const [key, value] of Object.entries(summary)) assert.deepEqual(full[key], value, `${file}: ${key}`);
        if (source.content.trim()) assert.ok(full.readingMinutes >= 1);
        else assert.equal(full.readingMinutes, 0);
        assert.ok(Array.isArray(full.generatedKeywords));
    }
});

test('all post display titles come from the series folder and preserve intentional parentheses', () => {
    assert.equal(formatPostTitle('Stack', 'CS'), '(CS) Stack');
    assert.equal(formatPostTitle('Hydration', 'Next.js'), '(Next.js) Hydration');
    assert.equal(formatPostTitle('(비교) 스택과 큐', 'CS'), '(CS) (비교) 스택과 큐');
    assert.equal(formatPostTitle('(CS) Stack', 'CS'), '(CS) Stack');
    assert.equal(formatPostTitle('홍대 투어', '투어'), '(투어) 홍대 투어');
});
test('existing post titles are now stored without a redundant folder prefix', () => {
    for (const file of getPostPath()) {
        const source = parsePostSource(fs.readFileSync(file, 'utf8'), file);
        const abstract = parsePostAbstract(file);
        assert.ok(!source.title.startsWith(`(${abstract.seriesPublicName}) `), file);
        assert.equal(formatPostTitle(source.title, abstract.seriesPublicName), `(${abstract.seriesPublicName}) ${source.title}`);
    }
});
