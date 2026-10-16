import test from 'node:test';
import assert from 'node:assert/strict';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypePostToc from '../utils/rehypePostToc.ts';
function nodes(tree){return [tree,...(tree.children??[]).flatMap(nodes)];}
async function render(content, enabled=true){const p=unified().use(remarkParse).use(remarkRehype).use(rehypeSlug).use(rehypePostToc,{enabled});return p.run(p.parse(content));}
test('TOC reuses exact heading IDs for Korean, code, punctuation and duplicates',async()=>{
    const tree=await render('## 한글 `코드` 제목\n\n### 반복\n\n### 반복\n\n#### 제외');
    const all=nodes(tree);
    const headings=all.filter(n=>['h2','h3'].includes(n.tagName));
    const links=all.filter(n=>n.tagName==='a');
    assert.deepEqual(links.map(n=>decodeURIComponent(n.properties.href.slice(1))),headings.map(n=>n.properties.id));
    assert.equal(links.length,3);
    assert.notEqual(links[1].properties.href,links[2].properties.href);
    assert.equal(tree.children[0].tagName,'details');
    assert.equal(tree.children[0].properties.open,undefined);
});
test('no headings or disabled TOC leaves the document free of empty navigation',async()=>{
    for(const tree of [await render('본문'),await render('## 제목',false)]) assert.ok(!nodes(tree).some(n=>n.tagName==='details'));
});
