import { siteConfig } from '@/config/config';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="realative w-full select-none flex justify-between text-sm text-second h-12 items-center">
            <div className="cursor-default">
                <span>Copyright © </span>
                <Link href={siteConfig.url} className="cursor-pointer link">
                    <span>{siteConfig.author.name}</span>
                </Link>
            </div>
            <div>
                <Link
                    href={'https://github.com/ZETA-A/byeolha.me'}
                    className="link"
                >
                    <span>소스코드</span>
                </Link>
            </div>
        </footer>
    );
}
