import { useState, useEffect, useRef } from 'react';

interface PopoverProps {
    children: React.ReactNode; // 팝오버의 내용
    button: React.ReactNode; // 팝오버를 여는 버튼
}

const Popover: React.FC<PopoverProps> = ({ children, button }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // 클릭 시 팝오버 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                popoverRef.current &&
                buttonRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const togglePopover = () => setIsOpen(!isOpen);

    return (
        <div
            className={`relative rounded-lg ${
                isOpen ? 'bg-neutral-200 dark:bg-neutral-700' : ''
            }`}
        >
            {/* 팝오버를 여는 버튼 */}
            <button
                onClick={togglePopover}
                ref={buttonRef}
                className="hover:bg-neutral-100 dark:hover:bg-neutral-700 box-content p-2 rounded-lg"
            >
                {button}
            </button>

            {/* 팝오버 내용 */}
            {isOpen && (
                <div
                    ref={popoverRef}
                    className="absolute mt-2 lg:mt-1 right-0 min-w-[120px] w-fit bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm rounded-lg p-2 flex flex-col"
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Popover;
