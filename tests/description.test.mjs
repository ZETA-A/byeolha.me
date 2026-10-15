import test from 'node:test';
import assert from 'node:assert/strict';
import removeMD from '../utils/removeMD.ts';

test('descriptions preserve link labels, emphasis, inline code and paragraph spacing', () => {
    assert.equal(removeMD('오늘 [React](https://react.dev)를 *공부했다*.\n\n**다음** 문단에서 `useState`를 썼다.', 140), '오늘 React를 공부했다. 다음 문단에서 useState를 썼다.');
    assert.equal(removeMD('첫 문장\n다음 문장', 140), '첫 문장 다음 문장');
});
test('headings, lists, tables and reference links retain their readable content', () => {
    assert.equal(removeMD('# 제목\n\n- 첫째\n- 둘째\n\n[리액트][react]\n\n[react]: https://react.dev', 140), '제목 첫째 둘째 리액트');
    assert.equal(removeMD('| 언어 | 용도 |\n| --- | --- |\n| JS | 웹 |', 140), '언어 용도 JS 웹');
});
test('code blocks, images and MDX executable content do not leak into metadata', () => {
    assert.equal(removeMD('문장\n\n```js\nconst hidden = 1;\n```\n\n![이미지 설명](/image.png)\n\nimport Demo from "./demo"\n\n<div>보이는 **내용**</div>\n\n{secret}', 140), '문장 보이는 내용');
});
test('ellipsis is only added when truncated and Unicode characters stay intact', () => {
    assert.equal(removeMD('짧은 문장', 140), '짧은 문장');
    assert.equal(removeMD('가😀나다', 2), '가😀...');
    assert.equal(removeMD('', 140), '');
    assert.equal(removeMD('문장', 0), '');
});
