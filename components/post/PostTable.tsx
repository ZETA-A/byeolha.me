import type { ComponentProps } from 'react';

export default function PostTable(props: ComponentProps<'table'>) {
    return (
        <div
            className="mdx-table-scroll"
            role="region"
            aria-label="표 (가로 스크롤 가능)"
            tabIndex={0}
        >
            <table {...props} />
        </div>
    );
}
