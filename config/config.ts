import getLastArticle from '@/utils/getLastArticle';
import { ProjectItems } from './types';

export const siteConfig = {
    url: 'https://www.byeolha.me',
    title: 'byeolha.me',
    description: '세상을 바꾸기 위해 개발합니다',
    copyright: 'byeolha © All rights reserved.',
    since: 2025,
    author: {
        name: '김승현',
        email: 'mailto:open120477@icloud.com',
        github: 'https://github.com/ZETA-A',
        twitter: '',
        velog: '',
        linkedin: '',
        instagram: 'https://www.instagram.com/s.hyun0307',
        youtube: '',
    },
};

export const navItems = [
    {
        label: '일기',
        href: '/diary',
    },
    {
        label: '노트',
        href: '/note',
    },
    {
        label: '작품',
        href: '/project',
    },
    {
        label: '소개',
        href: '/resume',
    },
];

export async function getProjectItems(): Promise<ProjectItems[]> {
    const lastArticle = await getLastArticle();
    return [
        {
            title: 'byeolha.me',
            lastUpdate: lastArticle,
            status: 'online',
            href: 'https://byeolha.me/',
        },
        {
            title: 'Monument Browser',
            lastUpdate: '2025-01-23',
            status: 'maintenance',
            href: 'https://zeta-a.github.io/Monument-Browser/',
        },
        {
            title: 'ZETA-A.github.io',
            lastUpdate: '2025-01-08',
            status: 'offline',
            href: 'https://zeta-a.github.io/',
        },
    ];
}
