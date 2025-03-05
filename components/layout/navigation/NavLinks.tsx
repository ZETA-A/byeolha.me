import { navItems } from '@/config/config';
import Link from 'next/link';

export default function NavLinks({ isMenuOpen }: { isMenuOpen: boolean }) {
    return (
        <div className="font-semibold">
            {/* 데스크탑 메뉴 */}
            <div className="hidden md:flex space-x-6">
                {navItems.map(({ label, href }) => (
                    <Link
                        key={href}
                        href={href}
                        className="hover:text-gray-400"
                    >
                        {label}
                    </Link>
                ))}
            </div>

            {/* 모바일 메뉴 */}
            <div
                className={`absolute top-16 mx-auto px-8 left-0 w-full h-[calc(100vh-4rem)] z-50 bg-white dark:bg-neutral-900 ${
                    isMenuOpen ? 'block' : 'hidden'
                }`}
            >
                {navItems.map(({ label, href }) => (
                    <Link
                        key={href}
                        href={href}
                        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-neutral-700"
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
