import test from 'node:test';
import assert from 'node:assert/strict';
import { searchPosts } from '../utils/search.ts';
import { buildSearchIndex } from '../utils/searchIndex.ts';
const docs=[
    {url:'/stack',title:'(CS) Stack',category:'note',series:'CS',keywords:['자료구조'],description:'스택 기초',date:''},
    {url:'/tour',title:'(투어) 홍대',category:'diary',series:'투어',keywords:['여행'],description:'Stack 카페',date:''},
    {url:'/next',title:'(Next.js) Hydration',category:'note',series:'Next.js',keywords:['React'],description:'렌더링',date:''},
];
test('search handles empty input, case, Korean, multiple terms, category and no results',()=>{
    assert.deepEqual(searchPosts(docs,'  '),[]);
    assert.deepEqual(searchPosts(docs,'STACK').map(p=>p.url),['/stack','/tour']);
    assert.deepEqual(searchPosts(docs,'Stack 자료구조').map(p=>p.url),['/stack']);
    assert.deepEqual(searchPosts(docs,'stack','diary').map(p=>p.url),['/tour']);
    assert.deepEqual(searchPosts(docs,'Ｎｅｘｔ.js react').map(p=>p.url),['/next']);
    assert.deepEqual(searchPosts(docs,'없는검색어'),[]);
    assert.deepEqual(searchPosts(docs,'[.*'),[]);
});
test('search documents exclude full bodies and use readable short descriptions',()=>{
    const index=buildSearchIndex([{title:'(CS) Stack',url:'/stack',categoryPath:'note',seriesPublicName:'CS',generatedKeywords:['자료구조'],content:'[React](https://react.dev)를 **학습**합니다.',createdAt:new Date('2026-01-01'),createDateDisplay:'Jan 01, 2026'}]);
    assert.equal(index[0].description,'React를 학습합니다.');
    assert.ok(!('content' in index[0]));
    assert.deepEqual(index[0].keywords,['자료구조']);
});
