import PageHeader from '@/components/layout/PageHeader';
import ProjectList from '@/components/ProjectList';

export default function Project() {
    return (
        <div>
            <PageHeader
                title="작품"
                catchphrase="작은 시도들이 모여 창작의 이야기를 엮어갑니다."
            />
            <ProjectList />
        </div>
    );
}
