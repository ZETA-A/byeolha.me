import * as fs from 'fs';
import * as path from 'path';

/**
 * 불용어 txt 파일을 읽어서 Set으로 반환
 */
function loadStopWords(filePath: string): Set<string> {
    const fullPath = path.resolve(filePath);
    const data = fs.readFileSync(fullPath, 'utf-8');
    const words = data
        .split('\n')
        .map((word) => word.trim())
        .filter(Boolean);
    return new Set(words);
}

/**
 * 텍스트에서 키워드 추출
 */
export default function extractKeywords(text: string, topN = 10): string[] {
    const stopWords = loadStopWords(
        path.join(process.cwd(), 'config/stopwords.txt')
    );
    const wordFreq: Record<string, number> = {};
    const words = text
        .replace(/[^\uAC00-\uD7A3a-zA-Z0-9\s]/g, '') // 특수문자 제거
        .split(/\s+/); // 공백 기준 분리

    for (const word of words) {
        for (const suffix of stopWords) {
            if (word.endsWith(suffix)) {
                // 조사 발견
                const root = word.slice(0, word.length - suffix.length);
                // 처리 로직...
                if (root.length > 1) {
                    wordFreq[root] = (wordFreq[root] || 0) + 1;
                }
            }
        }
    }

    for (const key in wordFreq) {
        if (wordFreq[key] <= 1) {
            delete wordFreq[key];
        }
    }

    const sorted = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, topN)
        .map(([word]) => word);

    return sorted;
}
