import PageHeader from '@/components/layout/PageHeader';
import { Metadata } from 'next';
import { Fade } from 'react-awesome-reveal';

export const metadata: Metadata = {
    title: '잃어버린 페이지',
    description: '기록되지 않은 순간들이 고요히 머무는 곳이에요.',
    openGraph: {
        title: '잃어버린 페이지',
        description: '기록되지 않은 순간들이 고요히 머무는 곳이에요.',
        url: '/',
    },
    twitter: {
        title: '잃어버린 페이지',
        description: '기록되지 않은 순간들이 고요히 머무는 곳이에요.',
    },
    robots: 'noindex, nofollow',
};

export default function NotFound() {
    return (
        <div>
            <Fade cascade duration={100} triggerOnce>
                <PageHeader
                    title="잃어버린 페이지"
                    catchphrase="기록되지 않은 순간들이 고요히 머무는 곳이에요."
                />
            </Fade>
        </div>
    );
}
