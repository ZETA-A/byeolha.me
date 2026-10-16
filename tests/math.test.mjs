import test from 'node:test';
import assert from 'node:assert/strict';
import { compileMDX } from 'next-mdx-remote/rsc';
import { renderToStaticMarkup } from 'react-dom/server';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import removeMD from '../utils/removeMD.ts';

async function render(source) {
    const { content } = await compileMDX({ source, options: { mdxOptions: {
        remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex],
    } } });
    return renderToStaticMarkup(content);
}

test('MDX renders inline and block LaTeX with fractions, braces and MathML', async () => {
    const html = await render(String.raw`인라인 $x^{2} + y^{2} = z^{2}$ 입니다.

$$
\frac{1}{n}\sum_{i=1}^{n}(y_i-\hat{y}_i)^2
$$`);
    assert.match(html, /class="katex"/);
    assert.match(html, /class="katex-display"/);
    assert.match(html, /<math/);
    assert.match(html, /<mfrac>/);
    assert.match(html, /인라인/);
    assert.doesNotMatch(html, /katex-error/);
});

test('inline and fenced code keep dollar delimiters literal', async () => {
    const html = await render('`$x^{2}$`\n\n```text\n$$\\frac{1}{2}$$\n```');
    assert.doesNotMatch(html, /class="katex/);
    assert.match(html, /\$x\^\{2\}\$/);
    assert.match(html, /\$\$\\frac\{1\}\{2\}\$\$/);
});

test('math braces do not break search descriptions or leak TeX commands', () => {
    assert.equal(removeMD(String.raw`앞 문장 $\frac{a}{b}$ 뒤 문장.

$$
x^{2} + y^{2}
$$

마지막 문장.`, 140), '앞 문장 뒤 문장. 마지막 문장.');
});

test('KaTeX stylesheet and rehype renderer use the same version', async () => {
    const { createRequire } = await import('node:module');
    const require = createRequire(import.meta.url);
    const rendererRequire = createRequire(require.resolve('rehype-katex'));
    assert.equal(require('katex/package.json').version, rendererRequire('katex/package.json').version);
});
