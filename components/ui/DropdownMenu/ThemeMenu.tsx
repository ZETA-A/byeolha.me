import { Sun } from 'flowbite-react-icons/outline';
import DropdownMenu from './DropdownMenu';
import { useTheme } from 'next-themes';
import { PopupMenuState } from '@/hooks/popupMenuStore';

const ThemeMenu = () => {
    const { theme, setTheme } = useTheme();
    const items = [
        {
            title: '주간 모드',
            href: '#',
            select: theme === 'light',
            onChange: () => setTheme('light'),
        },
        {
            title: '야간 모드',
            href: '#',
            select: theme === 'dark',
            onChange: () => setTheme('dark'),
        },
        {
            title: '기기 설정',
            href: '#',
            select: theme === 'system',
            onChange: () => setTheme('system'),
        },
    ];

    return <DropdownMenu group={PopupMenuState.Theme} label={<Sun />} items={items} />;
};

export default ThemeMenu;
