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
        <div className={`relative rounded-lg ${isOpen ? 'bg-gray-200' : ''}`}>
            {/* 팝오버를 여는 버튼 */}
            <button
                onClick={togglePopover}
                ref={buttonRef}
                className="hover:bg-gray-100 box-content p-2 rounded-lg"
            >
                {button}
            </button>

            {/* 팝오버 내용 */}
            {isOpen && (
                <div
                    ref={popoverRef}
                    className="absolute mt-2 lg:mt-1 right-0 min-w-[120px] w-fit bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-2 flex flex-col"
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Popover;
