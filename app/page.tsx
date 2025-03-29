import LinkButton from '@/components/ui/LinkButton';
import { siteConfig } from '@/config/config';
import { Github, Instagram, MailBox } from 'flowbite-react-icons/solid';
import Link from 'next/link';
import { Metadata } from 'next';
import { Fade } from 'react-awesome-reveal';

export const metadata: Metadata = {
    title: siteConfig.title,
    description:
        '이곳은 모든 이야기의 첫 페이지, 잔잔하게 시작되는 여정입니다.',
    openGraph: {
        title: siteConfig.title,
        description:
            '이곳은 모든 이야기의 첫 페이지, 잔잔하게 시작되는 여정입니다.',
    },
    twitter: {
        title: siteConfig.title,
        description:
            '이곳은 모든 이야기의 첫 페이지, 잔잔하게 시작되는 여정입니다.',
    },
};
export default function Home() {
    return (
        <div>
            <Fade cascade duration={500} triggerOnce>
                <div className="flex space-x-2 mb-6">
                    <h1>김승현</h1>
                    <h1>·</h1>
                    <h1>byeolha</h1>
                </div>
                <div className="text-second flex flex-col gap-4">
                    <div>
                        <Fade cascade damping={0.3} triggerOnce>
                            <p>
                                더 많은 사람들이 기술을 <b>자유롭게</b> 사용할
                                수 있도록.
                            </p>
                            <p>
                                현실의 문제를 해결하기 위해, 컴퓨터라는 도구를
                                사용합니다.
                            </p>
                        </Fade>
                    </div>
                    <Fade cascade delay={500} damping={0.3} triggerOnce>
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
                    </Fade>
                </div>
            </Fade>
        </div>
    );
}

// 3. 목록 페이지 부터 하면 됨(https://d5br5.dev/blog/nextjs_blog/setup)
