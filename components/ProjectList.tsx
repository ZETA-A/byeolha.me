import { projectItems } from '@/config/config';
import { ProjectItems } from '@/config/types';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function ProjectList() {
    const serviceStat = (props: ProjectItems) => {
        if (props.status === 'online')
            return { span: '서비스 중', color: 'bg-pastel-green' };
        if (props.status === 'offline')
            return { span: '서비스 종료', color: 'bg-pastel-gray' };
        if (props.status === 'maintenance')
            return { span: '점검 중', color: 'bg-pastel-orange' };
    };
    return (
        <div className="mt-8 group flex flex-col gap-3">
            {projectItems.map((props: ProjectItems, index) => {
                const date = dayjs(props.lastUpdate);
                return (
                    <Link
                        href={props.href}
                        key={`project-${index}`}
                        className={`transition hover:!opacity-100 group-hover:opacity-40 group-hover:bg-selection rounded-xl`}
                    >
                        <div className="w-full p-4 flex flex-col md:flex-row gap-2 md:gap-0 justify-between">
                            <div>
                                <h2 className="font-normal text-base">
                                    {props.title}
                                </h2>
                                <p className="font-light text-xs">
                                    Up to date: {date.format('MMMM DD, YYYY')}
                                </p>
                            </div>
                            <div className="flex items-center gap-2 w-[100px]">
                                <div
                                    className={`w-3 h-3 rounded-full ${
                                        serviceStat(props)?.color
                                    }`}
                                ></div>
                                <span className="font-light text-xs">
                                    {serviceStat(props)?.span}
                                </span>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
