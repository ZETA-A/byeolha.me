import LinkButton from '@/components/ui/LinkButton';
import { siteConfig } from '@/config/config';
import { Github, Instagram, MailBox } from 'flowbite-react-icons/solid';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: siteConfig.title,
    description:
        '이곳은 모든 이야기의 첫 페이지, 잔잔하게 시작되는 여정입니다.',
    alternates: {
        canonical: `${siteConfig.url}`,
    },
    keywords: siteConfig.keywords,
    openGraph: {
        title: siteConfig.title,
        description:
            '이곳은 모든 이야기의 첫 페이지, 잔잔하게 시작되는 여정입니다.',
        images: [
            {
                url: `${siteConfig.defaultThumbnail}`,
                width: 800,
                height: 600,
            },
        ],
    },
    twitter: {
        title: siteConfig.title,
        description:
            '이곳은 모든 이야기의 첫 페이지, 잔잔하게 시작되는 여정입니다.',
        images: [`${siteConfig.defaultThumbnail}`],
        card: 'summary_large_image',
    },
};
export default function Home() {
    return (
        <div>
            <div className="mb-6">
                <h2 className="flex space-x-2 font-bold">
                    <span>김승현</span>
                    <span>·</span>
                    <span>byeolha</span>
                </h2>
            </div>
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
                        현재 세상을 변화시키기 위해, <b>학생</b>으로서
                        노력하고 있습니다.
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
