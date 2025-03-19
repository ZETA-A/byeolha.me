import LinkButton from '@/components/ui/LinkButton';
import { siteConfig } from '@/config/config';
import { Github, Instagram, MailBox } from 'flowbite-react-icons/solid';
import Link from 'next/link';

export default function Profile() {
    return (
        <div>
            <h1 className="mb-6">김승현</h1>
            <div className="text-second flex flex-col gap-4">
                <div>
                    <p>
                        더 많은 사람들이 기술을 <b>자유롭게</b> 사용할 수
                        있도록.
                    </p>
                    <p>
                        현실의 문제를 해결하기 위해, 컴퓨터라는 도구를
                        사용합니다.
                    </p>
                </div>
                <div>
                    <p>
                        현재 대한민국 국군으로서{' '}
                        <Link
                            className="link external-link"
                            href="https://www.mnd.go.kr/"
                        >
                            <b>현역</b>
                        </Link>
                        으로 복무 중입니다.
                    </p>
                </div>
                <div className="flex gap-1">
                    <LinkButton
                        href={siteConfig.author.email}
                        ariaLabel="email"
                        icon={<MailBox />}
                    />
                    <LinkButton
                        href={siteConfig.author.github}
                        ariaLabel="github"
                        icon={<Github />}
                    />
                    <LinkButton
                        href={siteConfig.author.instagram}
                        ariaLabel="instagram"
                        icon={<Instagram />}
                    />
                </div>
            </div>
        </div>
    );
}
