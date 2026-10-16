import PageHeader from '@/components/layout/PageHeader';
import PostSearch from '@/components/post/PostSearch';
import { getPostList } from '@/utils/posts';
import { buildSearchIndex } from '@/utils/searchIndex';
import { pageMetadata } from '@/utils/metadata';

export const metadata = pageMetadata('검색', '제목·시리즈·태그로 글을 찾아보세요.', '/search');

export default async function SearchPage() {
    const index = buildSearchIndex(await getPostList());
    return (
        <div>
            <PageHeader title="검색" catchphrase="기록 속에서 원하는 이야기를 찾아보세요." />
            <PostSearch index={index} />
        </div>
    );
}
