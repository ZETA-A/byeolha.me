'use client';

import Link from 'next/link';
import NavIcon from './NavIcon';
import NavLinks from './NavLinks';
import LanguageMenu from '@/components/ui/DropdownMenu/LanguageMenu';
import ThemeMenu from '@/components/ui/DropdownMenu/ThemeMenu';
import usePopupMenuStore, { PopupMenuState } from '@/hooks/popupMenuStore';

export default function Navigation() {
    const { popupMenuState, setPopupMenuState } = usePopupMenuStore();
    const toggleNavigation = () => setPopupMenuState(PopupMenuState.Navigation);
    return (
        <nav className="w-full select-none flex h-16 items-center justify-center">
            {/* 블로그 이름 */}
            <div className="flex w-full justify-between items-center">
                <Link
                    href="/"
                    onClick={() => setPopupMenuState(PopupMenuState.None)}
                >
                    <div className="flex space-x-1">
                        <h1>byeolha.me</h1>
                    </div>
                </Link>
                {/* 네비게이션 버튼 */}
                <NavLinks
                    isMenuOpen={popupMenuState === PopupMenuState.Navigation}
                />

                {/* 언어 및 테마 설정 */}
                <div className="flex space-x-1">
                    <LanguageMenu />
                    <ThemeMenu />
                    <button
                        className="md:hidden hover:bg-selection box-content p-2 rounded-lg transition"
                        onClick={() => toggleNavigation()}
                    >
                        <NavIcon
                            isMenuOpen={
                                popupMenuState === PopupMenuState.Navigation
                            }
                        />
                    </button>
                </div>
            </div>
        </nav>
    );
}
