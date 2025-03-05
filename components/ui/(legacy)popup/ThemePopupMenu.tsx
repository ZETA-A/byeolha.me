import PopupMenu from './PopupMenu';
import { useTheme } from 'next-themes';

export default function ThemePopover() {
    const { theme, setTheme } = useTheme();

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

    const popoverContent = (
        <div className='absolute mt-2 lg:mt-1 right-0 min-w-[120px] w-fit bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm rounded-lg p-2 flex flex-col'>
            <div className="flex flex-col space-y-1 p-1">
                <label className="cursor-pointer">
                    <input
                        type="radio"
                        checked={theme === 'light'}
                        onChange={() => setTheme('light')}
                        className="peer hidden"
                    />
                    <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center peer-checked:bg-neutral-200 dark:peer-checked:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 peer-checked:rounded-md">
                        주간 모드
                    </span>
                </label>

                <label className="cursor-pointer">
                    <input
                        type="radio"
                        checked={theme === 'dark'}
                        onChange={() => setTheme('dark')}
                        className="peer hidden"
                    />
                    <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center peer-checked:bg-neutral-200 dark:peer-checked:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 peer-checked:rounded-md">
                        야간 모드
                    </span>
                </label>

                <label className="cursor-pointer">
                    <input
                        type="radio"
                        checked={theme === 'system'}
                        onChange={() => setTheme('system')}
                        className="peer hidden"
                    />
                    <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center peer-checked:bg-neutral-200 dark:peer-checked:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 peer-checked:rounded-md">
                        기기 설정
                    </span>
                </label>
            </div>
        </div>
    );

    return <PopupMenu button={button}>{popoverContent}</PopupMenu>;
}
