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