import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import PostList from '@/components/post/PostList';
import { getPostSummaryList } from '@/utils/posts';
import { findSeries, groupSeries } from '@/utils/series';
import { pageMetadata } from '@/utils/metadata';

type Props = { params: Promise<{ category: string; series: string }> };
export const dynamicParams = false;

export async function generateStaticParams() {
    return groupSeries(await getPostSummaryList()).map(({ category, series }) => ({ category, series }));
}

async function loadSeries(params: Props['params']) {
    const { category, series } = await params;
    const group = findSeries(groupSeries(await getPostSummaryList()), category, series);
    if (!group) notFound();
    return group;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const group = await loadSeries(params);
    return pageMetadata(`${group.name} 시리즈`, `${group.name}에 관한 글 ${group.count}편을 모았습니다.`, group.url);
}

export default async function SeriesPage({ params }: Props) {
    const group = await loadSeries(params);
    return (
        <div>
            <Link href={`/${encodeURIComponent(group.category)}`} className="text-sm text-second hover:underline">전체 글로 돌아가기</Link>
            <div className="mt-4"><PageHeader title={`${group.name} 시리즈`} catchphrase={`${group.count}편의 글을 모았습니다.`} /></div>
            <PostList category={group.category} series={group.series} />
        </div>
    );
}
