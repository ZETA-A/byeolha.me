import Link from 'next/link';

interface LinkButton {
    icon: React.ReactNode;
    href: string;
    ariaLabel: string;
}

export default function LinkButton({ icon, href, ariaLabel }: LinkButton) {
    return (
        <Link
            href={href}
            aria-label={ariaLabel}
            className="rounded p-1 transition-colors hover:bg-selection hover:text-body"
        >
            {icon}
        </Link>
    );
}
