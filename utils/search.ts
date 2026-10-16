export interface SearchDocument {
    url: string;
    title: string;
    category: string;
    series: string;
    keywords: string[];
    description: string;
    date: string;
}

const normalize = (text: string) => text.normalize('NFKC').toLocaleLowerCase('ko');

export function searchPosts(index: SearchDocument[], query: string, category = 'all') {
    const terms = normalize(query.slice(0, 200)).trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return index.flatMap((post, position) => {
        if (category !== 'all' && post.category !== category) return [];
        const fields = [
            [normalize(post.title), 8],
            [normalize(post.series), 5],
            [normalize(post.keywords.join(' ')), 4],
            [normalize(post.description), 1],
        ] as const;
        let score = 0;
        for (const term of terms) {
            const match = fields.find(([text]) => text.includes(term));
            if (!match) return [];
            score += match[1];
        }
        return [{ post, score, position }];
    }).sort((a, b) => b.score - a.score || a.position - b.position).map(item => item.post);
}
