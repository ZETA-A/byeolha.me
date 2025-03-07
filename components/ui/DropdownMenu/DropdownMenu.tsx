import usePopupMenuStore, { PopupMenuState } from '@/hooks/popupMenuStore';
import { useEffect, useRef } from 'react';

interface DropdownProps {
    group: PopupMenuState; // Dropdown의 그룹
    label: React.ReactNode; // 버튼
    items: DropdownItems[]; // 아이템
}

interface DropdownItems {
    title: string;
    href: string;
    select?: boolean;
    onClick?: () => void;
    onChange?: () => void;
}

const DropdownMenu: React.FC<DropdownProps> = ({ group, label, items }) => {
    const { popupMenuState, setPopupMenuState } = usePopupMenuStore();
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // 클릭 시 Dropdown 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupMenuState === group &&
                popoverRef.current &&
                buttonRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setPopupMenuState(group);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupMenuState]);

    const togglePopup = () => {
        setPopupMenuState(group);
    };

    return (
        <div
            className={`relative rounded-lg size-[40px] ${
                popupMenuState === group
                    ? 'bg-neutral-200 dark:bg-neutral-700'
                    : ''
            }`}
        >
            {/* Dropdown을 여는 버튼 */}
            <button
                ref={buttonRef}
                onClick={() => togglePopup()}
                className="hover:bg-neutral-100 dark:hover:bg-neutral-700 box-content p-2 rounded-lg"
            >
                {label}
            </button>

            {popupMenuState === group && (
                <div
                    ref={popoverRef}
                    className="absolute mt-2 right-0 min-w-[120px] w-fit bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm rounded-lg p-2 flex flex-col"
                >
                    <div className="flex flex-col space-y-1 p-1">
                        {items.map((item, index) => (
                            <label
                                className="cursor-pointer"
                                key={`${group}-${index}`}
                            >
                                <input
                                    type="radio"
                                    checked={item.select}
                                    onClick={item.onClick}
                                    onChange={item.onChange}
                                    className="peer hidden"
                                />
                                <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center peer-checked:bg-neutral-200 dark:peer-checked:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 peer-checked:rounded-md">
                                    {item.title}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
