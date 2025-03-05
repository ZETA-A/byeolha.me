import { useEffect, useState } from 'react';
import { Language } from 'flowbite-react-icons/outline';

export default function LanguagePopupMenu() {
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

    const popoverContent = (
        <div className="absolute mt-2 lg:mt-1 right-0 min-w-[120px] w-fit bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm rounded-lg p-2 flex flex-col">
            <div className="flex flex-col space-y-1 p-1">
                <label className="cursor-pointer">
                    <input
                        type="radio"
                        checked={language === 'korean'}
                        className="peer hidden"
                    />
                    <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center peer-checked:bg-neutral-200 dark:peer-checked:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 peer-checked:rounded-md">
                        한국어
                    </span>
                </label>
                <label className="cursor-pointer">
                    <input
                        type="radio"
                        checked={language === 'english'}
                        onClick={() => togleLanguage('english')}
                        onChange={() => setLanguage('english')}
                        className="peer hidden"
                    />
                    <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center peer-checked:bg-neutral-200 dark:peer-checked:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 peer-checked:rounded-md">
                        English
                    </span>
                </label>
            </div>
        </div>
    );
}
