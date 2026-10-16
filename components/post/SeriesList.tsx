import Link from 'next/link';
import { getPostSummaryList } from '@/utils/posts';
import { groupSeries } from '@/utils/series';

export default async function SeriesList({ category }: { category: string }) {
    const series = groupSeries(await getPostSummaryList(category));
    if (!series.length) return null;
    return (
        <nav aria-label="시리즈별 글 보기" className="mt-6 flex flex-wrap gap-2 font-sans text-sm">
            {series.map(item => (
                <Link key={item.url} href={item.url} className="rounded-md border px-3 py-1 hover:bg-selection focus-visible:outline-2">
                    {item.name} <span className="text-second">{item.count}</span>
                </Link>
            ))}
        </nav>
    );
}
