import { Sun } from 'flowbite-react-icons/outline';
import DropdownMenu from './DropdownMenu';
import { useTheme } from 'next-themes';

const ThemeMenu = () => {
    const { theme, setTheme } = useTheme();
    const items = [
        {
            title: '주간 모드',
            href: '#',
            select: theme === 'light',
            onClick: () => setTheme('light'),
        },
        {
            title: '야간 모드',
            href: '#',
            select: theme === 'dark',
            onClick: () => setTheme('dark'),
        },
        {
            title: '기기 설정',
            href: '#',
            select: theme === 'system',
            onClick: () => setTheme('system'),
        },
    ];

    return <DropdownMenu label={<Sun />} items={items} />;
};

export default ThemeMenu;
