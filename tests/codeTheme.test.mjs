import test from 'node:test';
import assert from 'node:assert/strict';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import { codeThemeOptions } from '../utils/codeTheme.ts';

test('code blocks emit distinct light and dark colors without duplicating code', async () => {
    const processor = unified().use(remarkParse).use(remarkRehype).use(rehypePrettyCode, codeThemeOptions);
    const tree = await processor.run(processor.parse('```js\nconst message = "hello"; // comment\n```'));
    const nodes = [];
    function visit(node) { nodes.push(node); node.children?.forEach(visit); }
    visit(tree);
    const pre = nodes.find(node => node.tagName === 'pre');
    assert.ok(pre);
    assert.match(pre.properties.style, /--shiki-light-bg:/);
    assert.match(pre.properties.style, /--shiki-dark-bg:/);
    assert.equal(nodes.filter(node => node.tagName === 'pre').length, 1);
    const tokens = nodes.filter(node => node.tagName === 'span' && node.properties.style?.includes('--shiki-light:'));
    assert.ok(tokens.length > 0);
    assert.ok(tokens.some(node => {
        const light = node.properties.style.match(/--shiki-light:([^;]+)/)?.[1];
        const dark = node.properties.style.match(/--shiki-dark:([^;]+)/)?.[1];
        return light && dark && light !== dark;
    }));
    assert.ok(nodes.some(node => node.type === 'text' && node.value.includes('// comment')));
});
