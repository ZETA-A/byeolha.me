import { getPostList } from '@/utils/posts';
import { buildSearchIndex } from '@/utils/searchIndex';

export const dynamic = 'force-static';

export async function GET() {
    return Response.json(buildSearchIndex(await getPostList()));
}
