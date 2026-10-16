'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { searchPosts, type SearchDocument } from '@/utils/search';

export default function PostSearch({ index }: { index: SearchDocument[] }) {
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('all');
    const queryId = useId();
    const categoryId = useId();
    const helpId = useId();
    const results = searchPosts(index, query, category);
    const hasQuery = Boolean(query.trim());
    return (
        <section className="mt-8 font-sans">
            <form role="search" onSubmit={event => event.preventDefault()} className="flex flex-col gap-4">
                <div>
                    <label htmlFor={queryId} className="block text-sm mb-2">검색어</label>
                    <input id={queryId} type="search" value={query} maxLength={200} aria-describedby={helpId}
                        onChange={event => setQuery(event.target.value)} placeholder="예: Stack, Next.js, 자료구조"
                        className="w-full min-w-0 rounded-md border bg-page p-3 text-body focus-visible:outline-2" />
                    <p id={helpId} className="text-sm text-second mt-2">제목·시리즈·태그·짧은 설명에서 검색합니다. 여러 단어는 모두 포함된 글을 찾습니다.</p>
                </div>
                <div>
                    <label htmlFor={categoryId} className="mr-3 text-sm">글 종류</label>
                    <select id={categoryId} value={category} onChange={event => setCategory(event.target.value)} className="rounded-md border bg-page px-3 py-2 text-body focus-visible:outline-2">
                        <option value="all">전체</option><option value="note">노트</option><option value="diary">일기</option>
                    </select>
                </div>
            </form>
            <p role="status" aria-live="polite" className="mt-6 text-sm text-second">
                {!hasQuery ? '검색어를 입력하면 결과가 표시됩니다.' : results.length ? `${results.length}개의 글을 찾았습니다.` : '검색 결과가 없습니다. 다른 검색어나 글 종류를 선택해 보세요.'}
            </p>
            {hasQuery && results.length > 0 && (
                <ul aria-label="검색 결과" className="mt-4 divide-y">
                    {results.map(post => (
                        <li key={post.url}>
                            <Link href={post.url} className="block rounded-md py-4 hover:bg-selection focus-visible:outline-2">
                                <h2 className="font-semibold [overflow-wrap:anywhere]">{post.title}</h2>
                                <p className="text-xs text-second mt-1">{post.category === 'diary' ? '일기' : '노트'} · {post.date}</p>
                                <p className="text-sm text-second mt-2 [overflow-wrap:anywhere]">{post.description}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <noscript><p className="mt-4">검색을 사용하려면 JavaScript를 켜 주세요. <a href="/note">노트</a>와 <a href="/diary">일기</a> 목록에서도 글을 찾을 수 있습니다.</p></noscript>
        </section>
    );
}
