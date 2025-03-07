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
        <nav className="realative w-full select-none flex justify-between h-16 items-center">
            {/* 블로그 이름 */}
            <Link
                href="/"
                onClick={() => setPopupMenuState(PopupMenuState.None)}
            >
                <div className="flex space-x-1 font-bold">
                    <h2>김승현</h2>
                    <h2>·</h2>
                    <h2>byeolha</h2>
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
                    className="md:hidden hover:bg-neutral-100 dark:hover:bg-neutral-700 box-content p-2 rounded-lg"
                    onClick={() => toggleNavigation()}
                >
                    <NavIcon
                        isMenuOpen={
                            popupMenuState === PopupMenuState.Navigation
                        }
                    />
                </button>
            </div>
        </nav>
    );
}
