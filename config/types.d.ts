declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            GA_ID: string;
            NAVER_SITE_VERIFICATION: string;
        }
    }
}

declare module '@microflash/rehype-figure' {
    const value: any; // TODO: 이 라이브러리에 기여해서 TypeScript 추가하기
    export default value;
}


export interface PostMatter {
    title: string;
    date: Date;
    dateString: string;
    thumbnail: string;
    description: string;
}

export interface Post extends PostMatter {
    url: string;
    slug: string;
    categoryPath: string;
    seriesPath: string;
    content: string;
    readingMinutes: number;
    seriesPublicName: string;
}

export interface ProjectItems {
    title: string;
    lastUpdate: string;
    status: 'online' | 'maintenance' | 'offline';
    href: string;
}
