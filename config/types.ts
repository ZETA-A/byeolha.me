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
    content: string;
    readingMinutes: number;
    categoryPublicName: string;
}