import { useEffect, useState } from 'react';
import Popover from '../popover';

export default function ThemePopover() {
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

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
                d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
            />
        </svg>
    );

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');

        // 로컬스토리지에 테마가 있으면 그걸로 설정
        if (storedTheme) {
            setTheme(storedTheme as 'light' | 'dark' | 'system');
            applyTheme(storedTheme as 'light' | 'dark' | 'system');
        } else {
            // 로컬스토리지에 테마가 없으면 시스템의 설정을 따라가도록
            const prefersDarkScheme = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            const defaultTheme = prefersDarkScheme ? 'dark' : 'light';
            setTheme(defaultTheme);
            applyTheme(defaultTheme);
        }
    }, []);

    // 테마 적용 함수
    const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
        if (newTheme === 'system') {
            const prefersDarkScheme = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            document.documentElement.classList.toggle(
                'dark',
                prefersDarkScheme
            );
        } else {
            document.documentElement.classList.toggle(
                'dark',
                newTheme === 'dark'
            );
        }
    };

    // 테마 변경 함수
    const toggleTheme = (newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // 로컬 스토리지에 저장
        applyTheme(newTheme); // 테마 적용
    };

    const popoverContent = (
        <div className="flex flex-col space-y-1 p-1">
            <label className="cursor-pointer">
                <input
                    type="radio"
                    checked={theme === 'light'}
                    onClick={() => toggleTheme('light')}
                    onChange={() => setTheme('light')}
                    className="peer hidden"
                />
                <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center hover:bg-gray-100 peer-checked:bg-gray-200 peer-checked:rounded-md">
                    주간 모드
                </span>
            </label>

            <label className="cursor-pointer">
                <input
                    type="radio"
                    checked={theme === 'dark'}
                    onClick={() => toggleTheme('dark')}
                    onChange={() => setTheme('dark')}
                    className="peer hidden"
                />
                <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center hover:bg-gray-100 peer-checked:bg-gray-200 peer-checked:rounded-md">
                    야간 모드
                </span>
            </label>

            <label className="cursor-pointer">
                <input
                    type="radio"
                    checked={theme === 'system'}
                    onClick={() => toggleTheme('system')}
                    onChange={() => setTheme('system')}
                    className="peer hidden"
                />
                <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center peer-checked:bg-gray-200 peer-checked:rounded-md">
                    기기 설정
                </span>
            </label>
        </div>
    );

    return <Popover button={button}>{popoverContent}</Popover>;
}
