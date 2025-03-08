import { getSortedPostListByYear } from '@/utils/posts';
import Link from 'next/link';
import dayjs from 'dayjs';

export default async function PostList({ category }: { category: string }) {
    const postList = await getSortedPostListByYear(category);

    return (
        <section className="group mt-12 select-none">
            {postList.map((item, listIndex) => {
                return (
                    <div
                        key={`year-${listIndex}`}
                        className={`relative flex gap-8 justify-between group/year border-t last-of-type:border-b`}
                    >
                        <h3 className="tabular-nums text-xs md:text-sm p-1 mt-4 self-start transition rounded-md group-hover/year:bg-selection">
                            {item.year}
                        </h3>
                        <ul className="flex flex-col max-w-[520px] w-full py-4 gap-1">
                            {item.post.map((post, postIndex) => {
                                return (
                                    <li key={`post-${postIndex}`}>
                                        <Link
                                            href={post.url}
                                            className="w-full group/item transition-opacity hover:!opacity-100 group-hover:opacity-40"
                                        >
                                            <div className="mx-1 justify-between w-full flex rounded-md px-1">
                                                <p className="p-1 text-sm md:text-base tabular-nums self-end rounded-md peer group-hover/item:bg-selection">
                                                    {post.title}
                                                </p>
                                                <p className="p-1 text-xs md:text-sm tabular-nums font-light rounded-md md:self-end md:mt-0 self-start mt-[4px] group-hover/item:bg-selection">
                                                    {dayjs(post.date).format(
                                                        'MM.DD.'
                                                    )}
                                                </p>
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
