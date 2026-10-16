'use client';

import Link from 'next/link';
import { Search } from 'flowbite-react-icons/outline';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef } from 'react';
import NavIcon from './NavIcon';
import SearchModal from '@/components/post/SearchModal';
import NavLinks from './NavLinks';
import LanguageMenu from '@/components/ui/DropdownMenu/LanguageMenu';
import ThemeMenu from '@/components/ui/DropdownMenu/ThemeMenu';
import usePopupMenuStore, { PopupMenuState } from '@/hooks/popupMenuStore';

export default function Navigation() {
    const { popupMenuState, setPopupMenuState } = usePopupMenuStore();
    const pathname = usePathname();
    const previousPath = useRef(pathname);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const desktopRef = useRef<HTMLDivElement>(null);
    const dialogId = useId();
    const titleId = useId();
    const open = popupMenuState === PopupMenuState.Navigation;
    const close = () => setPopupMenuState(PopupMenuState.None);

    useEffect(() => {
        if (previousPath.current !== pathname) {
            previousPath.current = pathname;
            setPopupMenuState(PopupMenuState.None);
        }
    }, [pathname, setPopupMenuState]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog || !open) return;
        dialog.showModal();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        dialog.querySelector<HTMLAnchorElement>('a')?.focus();

        const desktop = window.matchMedia('(min-width: 768px)');
        const handleResize = () => {
            if (!desktop.matches) return;
            dialog.close();
            setPopupMenuState(PopupMenuState.None);
            desktopRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
        };
        desktop.addEventListener('change', handleResize);
        handleResize();
        return () => {
            desktop.removeEventListener('change', handleResize);
            document.body.style.overflow = previousOverflow;
            if (dialog.open) dialog.close();
        };
    }, [open, setPopupMenuState]);

    return (
        <>
            <nav aria-label="주 메뉴" className="w-full select-none flex h-16 items-center justify-center">
                <div className="flex w-full justify-between items-center">
                    <Link href="/" onClick={close} className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4">
                        <span className="font-bold">byeolha.me</span>
                    </Link>
                    <div ref={desktopRef}><NavLinks variant="desktop" /></div>
                    <div className="flex gap-x-1">
                        <button
                            type="button"
                            aria-label="검색 열기"
                            title="검색 (⌘K / Ctrl+K)"
                            aria-haspopup="dialog"
                            aria-expanded={popupMenuState === PopupMenuState.Search}
                            onClick={() => setPopupMenuState(PopupMenuState.Search)}
                            className="flex size-10 shrink-0 items-center justify-center hover:bg-selection rounded-lg transition focus-visible:outline-2"
                        >
                            <Search aria-hidden="true" className="size-5" />
                        </button>
                        <LanguageMenu />
                        <ThemeMenu />
                        <button
                            type="button"
                            className="md:hidden hover:bg-selection box-content p-2 rounded-lg transition focus-visible:outline-2"
                            aria-label="모바일 메뉴 열기"
                            aria-expanded={open}
                            aria-controls={dialogId}
                            aria-haspopup="dialog"
                            onClick={() => setPopupMenuState(PopupMenuState.Navigation)}
                        >
                            <span aria-hidden="true"><NavIcon isMenuOpen={open} /></span>
                        </button>
                    </div>
                </div>
            </nav>
            <dialog
                ref={dialogRef}
                id={dialogId}
                aria-labelledby={titleId}
                aria-modal="true"
                className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-page text-body p-6 backdrop:bg-black/30"
                onKeyDown={(event) => {
                    if (event.key !== 'Tab') return;
                    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), a[href]'));
                    const first = controls[0];
                    const last = controls.at(-1);
                    if (event.shiftKey && document.activeElement === first) {
                        event.preventDefault();
                        last?.focus();
                    } else if (!event.shiftKey && document.activeElement === last) {
                        event.preventDefault();
                        first?.focus();
                    }
                }}
                onCancel={(event) => { event.preventDefault(); close(); }}
                onClose={() => { if (open) close(); }}
                onClick={(event) => { if (event.target === event.currentTarget) close(); }}
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 id={titleId} className="font-bold">메뉴</h2>
                    <button type="button" aria-label="모바일 메뉴 닫기" onClick={close} className="p-2 rounded-lg hover:bg-selection focus-visible:outline-2">
                        <span aria-hidden="true"><NavIcon isMenuOpen={true} /></span>
                    </button>
                </div>
                <nav aria-label="모바일 주 메뉴"><NavLinks variant="mobile" onNavigate={close} /></nav>
            </dialog>
            <SearchModal />
        </>
    );
}
