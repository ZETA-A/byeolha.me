import { navItems } from '@/config/config';
import Link from 'next/link';

export default function NavLinks({
    variant,
    onNavigate,
}: {
    variant: 'desktop' | 'mobile';
    onNavigate?: () => void;
}) {
    return (
        <div className={variant === 'desktop' ? 'hidden md:flex gap-x-6 font-semibold' : 'flex flex-col gap-2 font-semibold'}>
            {navItems.map(({ label, href }) => (
                <Link
                    key={href}
                    href={href}
                    onClick={onNavigate}
                    className={`rounded-md transition focus-visible:outline-2 focus-visible:outline-offset-4 ${variant === 'mobile' ? 'block px-3 py-3 hover:bg-selection' : 'hover:text-gray-600'}`}
                >
                    {label}
                </Link>
            ))}
        </div>
    );
}
