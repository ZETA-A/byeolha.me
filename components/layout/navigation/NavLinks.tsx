import { navItems } from '@/config/config';
import usePopupMenuStore, { PopupMenuState } from '@/hooks/popupMenuStore';
import Link from 'next/link';

export default function NavLinks({ isMenuOpen }: { isMenuOpen: boolean }) {
    const { setPopupMenuState } = usePopupMenuStore();
    const toggleNavigation = () => setPopupMenuState(PopupMenuState.None);
    return (
        <div className="font-semibold">
            {/* 데스크탑 메뉴 */}
            <div className="hidden md:flex space-x-6">
                {navItems.map(({ label, href }) => (
                    <Link
                        key={href}
                        href={href}
                        className="hover:text-gray-600 transition"
                    >
                        {label}
                    </Link>
                ))}
            </div>

            {/* 모바일 메뉴 */}
            <div
                className={`absolute top-16 mx-auto px-8 left-0 w-full h-[calc(100vh-4rem)] z-50 bg-gray-50 dark:bg-gray-75 ${
                    isMenuOpen ? 'block' : 'hidden'
                }`}
            >
                {navItems.map(({ label, href }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={() => toggleNavigation()}
                        className="block px-3 py-2 rounded-md font-medium hover:bg-selection transition"
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </div>
    );
}
