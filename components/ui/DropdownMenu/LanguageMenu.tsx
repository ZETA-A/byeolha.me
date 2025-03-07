import { Language } from 'flowbite-react-icons/outline';
import DropdownMenu from './DropdownMenu';
import { useEffect, useState } from 'react';
import { PopupMenuState } from '@/hooks/popupMenuStore';

const LanguageMenu = () => {
    const [language, setLanguage] = useState<'korean' | 'english'>('korean');
    useEffect(() => {
        const storedLanguage = localStorage.getItem('language');

        // 로컬스토리지에 지정된 언어가 있으면 그대로 설정
        if (storedLanguage) {
            setLanguage(storedLanguage as 'korean' | 'english');
        } else {
            // 로컬스토리지에 언어가 없으면 'korean'로 설정
            setLanguage('korean');
        }
    }, []);

    const toggleLanguage = (newLanguage: 'korean' | 'english') => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };
    const items = [
        {
            title: '한국어',
            href: '#',
            select: language === 'korean',
            onChange: () => toggleLanguage('korean'),
        },
        {
            title: 'English',
            href: '#',
            select: language === 'english',
            onChange: () => toggleLanguage('english'),
        },
    ];

    return (
        <DropdownMenu
            group={PopupMenuState.Language}
            label={<Language />}
            items={items}
        />
    );
};

export default LanguageMenu;
