import { siteConfig } from '@/config';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="realative w-full select-none flex justify-between text-sm h-10 items-center">
            <div className="cursor-default">
                <span>Copyright © </span>
                <Link href={siteConfig.url} className="cursor-pointer">
                    <span>{siteConfig.author.name}</span>
                </Link>
            </div>
            <div>
                <Link href={'https://github.com/ZETA-A/byeolha.me'}>
                    <span>소스코드</span>
                </Link>
            </div>
        </footer>
    );
}
