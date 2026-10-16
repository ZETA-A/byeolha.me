import { Sun, Moon, MobilePhone } from 'flowbite-react-icons/outline';
import DropdownMenu from './DropdownMenu';
import { useTheme } from 'next-themes';
import { PopupMenuState } from '@/hooks/popupMenuStore';
import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

const ThemeMenu = () => {
    const { theme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);

    const setLabel = (theme: string) => {
        if (theme === 'light') return <Sun />;
        if (theme === 'dark') return <Moon />;
        if (theme === 'system') return <MobilePhone />;
    };

    const items = [
        {
            title: '주간 모드',
            tooltip: '밝은 테마로 변경합니다',
            select: mounted && theme === 'light',
            onChange: () => setTheme('light'),
        },
        {
            title: '야간 모드',
            tooltip: '어두운 테마로 변경합니다',
            select: mounted && theme === 'dark',
            onChange: () => setTheme('dark'),
        },
        {
            title: '기기 설정',
            tooltip: '사용 중인 기기의 설정을 따라갑니다',
            select: mounted && theme === 'system',
            onChange: () => setTheme('system'),
        },
    ];

    return (
        <DropdownMenu
            group={PopupMenuState.Theme}
            label={mounted ? setLabel(theme ?? 'system') : <MobilePhone />}
            items={items}
            areaLabel="Select Theme"
        />
    );
};

export default ThemeMenu;
