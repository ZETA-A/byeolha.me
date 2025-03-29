import { Sun, Moon, MobilePhone } from 'flowbite-react-icons/outline';
import DropdownMenu from './DropdownMenu';
import { useTheme } from 'next-themes';
import { PopupMenuState } from '@/hooks/popupMenuStore';
import { useEffect, useState } from 'react';

const ThemeMenu = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [mounted]);

    if (!mounted) return null;

    const setLabel = (theme: string) => {
        if (theme === 'light') return <Sun />;
        if (theme === 'dark') return <Moon />;
        if (theme === 'system') return <MobilePhone />;
    };

    const items = [
        {
            title: '주간 모드',
            tooltip: '밝은 테마로 변경합니다',
            href: '#',
            select: theme === 'light',
            onChange: () => setTheme('light'),
        },
        {
            title: '야간 모드',
            tooltip: '어두운 테마로 변경합니다',
            href: '#',
            select: theme === 'dark',
            onChange: () => setTheme('dark'),
        },
        {
            title: '기기 설정',
            tooltip: '사용 중인 기기의 설정을 따라갑니다',
            href: '#',
            select: theme === 'system',
            onChange: () => setTheme('system'),
        },
    ];

    return (
        <DropdownMenu
            group={PopupMenuState.Theme}
            label={setLabel(theme as string)}
            items={items}
            areaLabel="Select Theme"
        />
    );
};

export default ThemeMenu;
