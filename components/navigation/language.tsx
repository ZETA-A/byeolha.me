import { useState } from 'react';
import Popover from '../popover';

export default function LanguagePopover() {
    const [language, setLanguage] = useState<'korean' | 'english'>('korean');

    const button = (
        <svg
            className="w-[26px] h-[26px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                d="m13 19 3.5-9 3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15"
            />
        </svg>
    );

    const popoverContent = (
        <div className="flex flex-col space-y-1 p-1">
            <label className="cursor-pointer">
                <input
                    type="radio"
                    checked={language === 'korean'}
                    onChange={() => setLanguage('korean')}
                    className="peer hidden"
                />
                <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center peer-checked:bg-gray-200 hover:bg-gray-100 peer-checked:rounded-md">
                    한국어
                </span>
            </label>
            <label className="cursor-pointer">
                <input
                    type="radio"
                    checked={language === 'english'}
                    onChange={() => setLanguage('english')}
                    className="peer hidden"
                />
                <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center peer-checked:bg-gray-200 hover:bg-gray-100 peer-checked:rounded-md">
                    English
                </span>
            </label>
        </div>
    );

    return <Popover button={button}>{popoverContent}</Popover>;
}
