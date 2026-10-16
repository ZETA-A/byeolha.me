'use client';

import { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { searchPosts, type SearchDocument } from '@/utils/search';

export default function PostSearch({ index, onNavigate }: { index: SearchDocument[]; onNavigate?: () => void }) {
    const [query, setQuery] = useState('');
    const queryId = useId();
    const resultsRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const results = query.trim() ? searchPosts(index, query, 'all') : [];

    return (
        <section className="font-sans">
            <form role="search" className="border-b" onSubmit={event => {
                event.preventDefault();
                resultsRef.current?.querySelector<HTMLAnchorElement>('a')?.click();
            }}>
                <label htmlFor={queryId} className="sr-only">검색어</label>
                <input ref={inputRef} id={queryId} type="search" value={query} maxLength={200}
                    onChange={event => setQuery(event.target.value)} placeholder="글 검색..."
                    onKeyDown={event => {
                        if (event.nativeEvent.isComposing) return;
                        if (event.key === 'ArrowDown' && results.length) {
                            event.preventDefault();
                            resultsRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
                        }
                    }}
                    className="block w-full min-w-0 border-0 bg-transparent px-6 py-5 text-lg text-body outline-none placeholder:text-second" />
            </form>
            <div className="h-[min(50dvh,24rem)] overflow-y-auto overscroll-contain p-2">
                <p role="status" aria-live="polite" className={results.length ? 'sr-only' : 'px-4 py-10 text-center text-sm text-second'}>
                    {!query.trim() ? '검색어를 입력해 주세요.' : results.length ? `${results.length}개의 글을 찾았습니다.` : '검색 결과가 없습니다.'}
                </p>
                {results.length > 0 && <ul ref={resultsRef} aria-label="검색 결과" onKeyDown={event => {
                    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
                    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>('a'));
                    const current = links.indexOf(document.activeElement as HTMLAnchorElement);
                    if (current < 0) return;
                    event.preventDefault();
                    if (event.key === 'ArrowUp' && current === 0) inputRef.current?.focus();
                    else links[(current + (event.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length]?.focus();
                }}>
                    {results.map(post => <li key={post.url}>
                        <Link onClick={onNavigate} href={post.url} className="block rounded-lg px-4 py-3 hover:bg-selection focus:bg-selection focus-visible:outline-2 focus-visible:-outline-offset-2">
                            <span className="block font-medium [overflow-wrap:anywhere]">{post.title}</span>
                            <span className="mt-1 block text-xs text-second">{post.category === 'diary' ? '일기' : '노트'} · {post.date}</span>
                        </Link>
                    </li>)}
                </ul>}
            </div>
        </section>
    );
}
