'use client';

import Link from 'next/link';
import { useState } from 'react';
import NavIcon from './NavIcon';
import NavLinks from './NavLinks';
import ThemePopover from './ThemePopover';
import LanguagePopover from './LanguagePopover';

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="realative w-full select-none">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-14 items-center">
                    {/* 블로그 이름 */}
                    <Link href="/">
                        <div className="flex space-x-1 font-bold">
                            <h2>김승현</h2>
                            <h2>·</h2>
                            <h2>byeolha</h2>
                        </div>
                    </Link>
                    {/* 네비게이션 버튼 */}
                    <NavLinks isMenuOpen={isMenuOpen} />

                    {/* 언어 및 테마 설정 */}
                    <div className="flex space-x-3">
                        <LanguagePopover />
                        <ThemePopover />
                        <button
                            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <NavIcon isMenuOpen={isMenuOpen} />
                        </button>
                    </div>

                    {/* 모바일 네비게이션 버튼 */}
                </div>
            </div>
        </nav>
    );
}
