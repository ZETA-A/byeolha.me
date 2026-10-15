import { getSortedPostListByYear } from '@/utils/posts';
import Link from 'next/link';

export default async function PostList({ category }: { category: string }) {
    const postList = await getSortedPostListByYear(category);

    return (
        <section className="group mt-12 select-none font-normal">
            {postList.map((item, listIndex) => {
                return (
                    <div
                        key={`year-${listIndex}`}
                        className={`relative flex gap-3 sm:gap-8 justify-between group/year border-t last-of-type:border-b`}
                    >
                        <h3 className="tabular-nums text-xs text-second md:text-sm p-1 mt-4 self-start shrink-0 transition rounded-md group-hover/year:bg-selection">
                            {item.year}
                        </h3>
                        <ul className="flex flex-col flex-1 min-w-0 max-w-[520px] py-4 gap-1">
                            {item.post.map((post, postIndex) => {
                                return (
                                    <li key={`post-${postIndex}`}>
                                        <Link
                                            href={post.url}
                                            className="block w-full group/item transition-opacity hover:opacity-100! group-hover:opacity-40"
                                        >
                                            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-2 w-full rounded-md px-1">
                                                <p className="min-w-0 [overflow-wrap:anywhere] p-1 text-sm md:text-base tabular-nums rounded-md peer group-hover/item:bg-selection">
                                                    {post.title}
                                                </p>
                                                <time dateTime={post.createdAt.toISOString()} className="p-1 text-xs text-second md:text-sm tabular-nums whitespace-nowrap self-start rounded-md group-hover/item:bg-selection">
                                                    {new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', month: '2-digit', day: '2-digit' }).format(post.createdAt).replace('/', '.') + '.'}
                                                </time>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </section>
    );
}
