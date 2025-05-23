import { ProjectItems } from './types';

export const siteConfig = {
    url: 'https://byeolha.me',
    title: 'byeolha.me',
    description: '세상을 바꾸기 위해 개발합니다',
    keywords: [
        '김승현',
        '별하',
        '개발자',
        '블로그',
        'seunghyun',
        'byeolha',
        'developer',
    ],
    copyright: 'byeolha © All rights reserved.',
    defaultThumbnail: '/assets/image/defaultThumbnail.png',
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

export const getProjectItems: ProjectItems[] = [
    {
        title: 'byeolha.me',
        status: 'online',
        href: 'https://byeolha.me/',
        git: {
            owner: 'ZETA-A',
            repo: 'byeolha.me',
        },
    },
    {
        title: 'Monument Browser',
        status: 'offline',
        href: 'https://zeta-a.github.io/Monument-Browser/',
        git: {
            owner: 'ZETA-A',
            repo: 'Monument-Browser',
        },
    },
    {
        title: 'ZETA-A.github.io',
        status: 'offline',
        href: 'https://zeta-a.github.io/',
        git: {
            owner: 'ZETA-A',
            repo: 'ZETA-A.github.io',
        },
    },
];
