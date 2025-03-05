import { Language } from 'flowbite-react-icons/outline';
import DropdownMenu from './DropdownMenu';
import { useEffect, useState } from 'react';

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

    const togleLanguage = (newLanguage: 'korean' | 'english') => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };
    const items = [
        {
            title: '한국어',
            href: '#',
            select: language === 'korean',
            onClick: () => togleLanguage('korean'),
            onChange: () => setLanguage('korean'),
        },
        {
            title: 'English',
            href: '#',
            select: language === 'english',
            onClick: () => togleLanguage('english'),
            onChange: () => setLanguage('english'),
        },
    ];

    return <DropdownMenu label={<Language />} items={items} />;
};

export default LanguageMenu;
