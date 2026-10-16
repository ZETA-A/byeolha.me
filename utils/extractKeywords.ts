import fs from 'node:fs';
import path from 'node:path';

const stopWords = new Set(fs.readFileSync(path.join(process.cwd(), 'config/stopwords.txt'), 'utf8').split(/\r?\n/).map(word => word.trim()).filter(Boolean));
// Only grammatical particles belong here; ordinary stop words are never suffixes.
const particles = ['으로부터', '에게서', '에서는', '으로는', '으로', '에서', '에게', '까지', '부터', '처럼', '보다', '은', '는', '이', '가', '을', '를', '의', '에', '와', '과', '도', '로'];

export default function extractKeywords(text: string, topN = 10): string[] {
    const plain = text.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]*>|https?:\/\/\S+/g, ' ');
    const counts = new Map<string, { label: string; count: number }>();
    for (let word of plain.match(/[가-힣]+|[a-zA-Z][a-zA-Z0-9]*(?:[.+#][a-zA-Z0-9]+)*/g) ?? []) {
        if (stopWords.has(word)) continue;
        if (/^[가-힣]+$/.test(word)) {
            const particle = particles.find(suffix => word.endsWith(suffix) && word.length - suffix.length >= 2);
            if (particle) word = word.slice(0, -particle.length);
        }
        if (word.length < 2 || stopWords.has(word)) continue;
        const key = word.toLowerCase();
        const previous = counts.get(key);
        counts.set(key, { label: previous?.label ?? word, count: (previous?.count ?? 0) + 1 });
    }
    return [...counts.values()].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'ko')).slice(0, Math.max(0, topN)).map(entry => entry.label);
}
