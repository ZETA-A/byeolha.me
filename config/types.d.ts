declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            GA_ID: string;
            NAVER_SITE_VERIFICATION: string;
        }
    }
}

export interface PostMatter {
    title: string;
    createDate: Date;
    createDateString: string;
    modifiedDate: Date;
    modifiedDateString: string;
    keywords: string;
    description: string;
    thumbnail: string;
}

export interface Post extends PostMatter {
    url: string;
    slug: string;
    categoryPath: string;
    seriesPath: string;
    content: string;
    readingMinutes: number;
    seriesPublicName: string;
    generatedKeywords: string[];
}

export interface ProjectItems {
    title: string;
    status: 'online' | 'maintenance' | 'offline';
    href: string;
    git: {
        owner: string;
        repo: string;
    };
}
