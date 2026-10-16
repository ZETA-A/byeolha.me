import { Language } from 'flowbite-react-icons/outline';
import DropdownMenu from './DropdownMenu';
import { PopupMenuState } from '@/hooks/popupMenuStore';

const LanguageMenu = () => {
    const items = [
        {
            title: '한국어',
            select: true,
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
