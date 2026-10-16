import type { PostMatter } from '../config/types';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul', year: 'numeric', month: 'short', day: '2-digit',
});

export function formatPostDate(date: Date) {
    return dateFormatter.format(date);
}

export function postYear(date: Date) {
    return new Intl.DateTimeFormat('en', { timeZone: 'Asia/Seoul', year: 'numeric' }).format(date);
}

export function parsePostDate(value: unknown, source: string, field: string): Date {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:[ T]\d{2}:\d{2}:\d{2})?$/.test(value)) {
        throw new Error(`${source}: ${field} must be YYYY-MM-DD or YYYY-MM-DD HH:mm:ss (Asia/Seoul)`);
    }
    const [year, month, day, hour = 0, minute = 0, second = 0] = value.split(/[- T:]/).map(Number);
    const calendar = new Date(0);
    calendar.setUTCFullYear(year, month - 1, day);
    calendar.setUTCHours(hour, minute, second, 0);
    if (calendar.getUTCFullYear() !== year || calendar.getUTCMonth() !== month - 1 || calendar.getUTCDate() !== day || calendar.getUTCHours() !== hour || calendar.getUTCMinutes() !== minute || calendar.getUTCSeconds() !== second) {
        throw new Error(`${source}: invalid ${field}: ${value}`);
    }
    return new Date(calendar.getTime() - 9 * 60 * 60 * 1000);
}

export function normalizePostMatter(data: Record<string, unknown>, source: string) {
    const optionalText = (field: string) => {
        const value = data[field];
        if (value == null) return undefined;
        if (typeof value !== 'string') throw new Error(`${source}: ${field} must be text`);
        return value.trim() || undefined;
    };
    const title = optionalText('title');
    if (!title) throw new Error(`${source}: title is required`);
    const createdAt = parsePostDate(data.createDate, source, 'createDate');
    const modifiedAt = parsePostDate(data.modifiedDate, source, 'modifiedDate');
    if (modifiedAt < createdAt) throw new Error(`${source}: modifiedDate must not precede createDate`);
    const frontmatter: PostMatter = {
        title, createDate: data.createDate as string, modifiedDate: data.modifiedDate as string,
        keywords: optionalText('keywords'), description: optionalText('description'), thumbnail: optionalText('thumbnail'),
    };
    return { ...frontmatter, createdAt, modifiedAt };
}
