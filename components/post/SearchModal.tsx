'use client';

import { useEffect, useId, useRef, useState } from 'react';
import usePopupMenuStore, { PopupMenuState } from '@/hooks/popupMenuStore';
import type { SearchDocument } from '@/utils/search';
import PostSearch from './PostSearch';

export default function SearchModal() {
    const { popupMenuState, setPopupMenuState } = usePopupMenuStore();
    const open = popupMenuState === PopupMenuState.Search;
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const [index, setIndex] = useState<SearchDocument[] | null>(null);
    const [error, setError] = useState(false);
    const [attempt, setAttempt] = useState(0);
    const close = () => setPopupMenuState(PopupMenuState.None);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;
            event.preventDefault();
            if (usePopupMenuStore.getState().popupMenuState !== PopupMenuState.Search) setPopupMenuState(PopupMenuState.Search);
            else dialogRef.current?.querySelector('input')?.focus();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [setPopupMenuState]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!open || !dialog) return;
        dialog.showModal();
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialog.querySelector('input')?.focus();
        return () => {
            document.body.style.overflow = overflow;
            dialog.close();
        };
    }, [open]);

    useEffect(() => {
        if (!open || index) return;
        const controller = new AbortController();
        fetch('/search-index.json', { signal: controller.signal })
            .then(response => { if (!response.ok) throw new Error('검색 데이터를 불러오지 못했습니다.'); return response.json(); })
            .then((data: SearchDocument[]) => setIndex(data))
            .catch(() => { if (!controller.signal.aborted) setError(true); });
        return () => controller.abort();
    }, [open, index, attempt]);

    useEffect(() => {
        if (open && index) dialogRef.current?.querySelector('input')?.focus();
    }, [open, index]);

    return (
        <dialog ref={dialogRef} aria-labelledby={titleId} aria-modal="true"
            className="fixed m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[85dvh] overflow-y-auto rounded-2xl border bg-page p-0 text-body shadow-xl backdrop:bg-black/40"
            onCancel={event => { event.preventDefault(); close(); }}
            onClick={event => {
                if (event.target !== event.currentTarget) return;
                const rect = event.currentTarget.getBoundingClientRect();
                if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
            }}
            onKeyDown={event => {
                if (event.key !== 'Tab') return;
                const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href]'));
                const first = controls[0], last = controls.at(-1);
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
            }}>
            <h2 id={titleId} className="sr-only">글 검색</h2>
            {index ? <PostSearch index={index} onNavigate={close} /> : error ? <div role="alert" className="p-8 text-center text-sm text-second">검색 데이터를 불러오지 못했습니다. <button type="button" className="underline" onClick={() => { setError(false); setAttempt(value => value + 1); }}>다시 시도</button></div> : <p role="status" className="p-8 text-center text-sm text-second">검색 데이터를 불러오는 중입니다.</p>}
            <div className="flex items-center justify-end gap-4 border-t px-5 py-3 font-sans text-xs text-second">
                <span>Enter <span className="ml-1">글 열기</span></span>
                <button type="button" onClick={close} aria-label="검색 닫기" className="rounded px-2 py-1 hover:bg-selection focus-visible:outline-2">Esc <span className="ml-1">닫기</span></button>
            </div>
        </dialog>
    );
}
