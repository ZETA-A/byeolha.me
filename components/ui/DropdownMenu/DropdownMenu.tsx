import usePopupMenuStore, { PopupMenuState } from '@/hooks/popupMenuStore';
import { useEffect, useRef } from 'react';

interface DropdownProps {
    group: PopupMenuState; // Dropdown의 그룹
    label: React.ReactNode; // 버튼
    items: DropdownItems[]; // 아이템
    areaLabel: string; // 스크린리더
}

interface DropdownItems {
    title: string;
    tooltip?: string;
    disabled?: boolean;
    href: string;
    select?: boolean;
    onClick?: () => void;
    onChange?: () => void;
}

const DropdownMenu: React.FC<DropdownProps> = ({
    group,
    label,
    items,
    areaLabel,
}) => {
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
    }, [popupMenuState, popoverRef, buttonRef, group, setPopupMenuState]);

    const togglePopup = () => {
        setPopupMenuState(group);
    };

    return (
        <div
            className={`relative rounded-lg size-[40px] ${
                popupMenuState === group ? 'bg-selection' : ''
            }`}
        >
            {/* Dropdown을 여는 버튼 */}
            <button
                ref={buttonRef}
                aria-label={areaLabel}
                onClick={() => togglePopup()}
                className="hover:bg-selection box-content p-2 rounded-lg transition"
            >
                {label}
            </button>

            {popupMenuState === group && (
                <div
                    ref={popoverRef}
                    className="absolute mt-2 right-0 min-w-[120px] w-fit bg-gray-50 dark:bg-gray-75 border border-gray-25 dark:border-gray-25 shadow-sm rounded-lg p-2 flex flex-col"
                >
                    <div className="flex flex-col space-y-1 p-1">
                        {items.map((item, index) => (
                            <label
                                className="cursor-pointer"
                                key={`${group}-${index}`}
                                title={item.tooltip}
                            >
                                <input
                                    type="radio"
                                    checked={item.select}
                                    onClick={item.onClick}
                                    onChange={item.onChange}
                                    className="peer hidden"
                                    disabled={item.disabled}
                                />
                                <span className="w-full h-full p-1 rounded-md flex items-center justify-center text-center peer-checked:bg-selection dark:peer-checked:bg-selection hover:bg-selection peer-checked:rounded-md transition">
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
