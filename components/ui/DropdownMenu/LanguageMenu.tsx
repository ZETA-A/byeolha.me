import { Language } from 'flowbite-react-icons/outline';
import DropdownMenu from './DropdownMenu';
import { PopupMenuState } from '@/hooks/popupMenuStore';

const LanguageMenu = () => {
    const items = [
        {
            title: '한국어',
            select: true,
        },
        {
            title: 'English(development)',
            select: false,
            disabled: true,
            tooltip:
                'Still crafting something special, just a little more time to make it perfect.',
        },
    ];

    return (
        <DropdownMenu
            group={PopupMenuState.Language}
            label={<Language />}
            items={items}
            areaLabel="Select Language"
        />
    );
};

export default LanguageMenu;
