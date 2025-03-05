import usePopupMenuStore, { PopupState } from '@/hooks/popupMenuStore';
import { useEffect, useRef } from 'react';

interface PopoverProps {
    children: React.ReactNode; // 팝오버의 내용
    button: React.ReactNode; // 팝오버를 여는 버튼
}

const PopupMenu: React.FC<PopoverProps> = ({ children, button }) => {
    const { popupState, setPopupState } = usePopupMenuStore();
    const popoverRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    // 클릭 시 팝오버 닫기
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupState &&
                popoverRef.current &&
                buttonRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setPopupState(PopupState.None);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupState]);

    const togglePopup = () => setPopupState(PopupState.None);
    console.log(popupState);

    return (
        <div
            className={`relative rounded-lg ${
                popupState ? 'bg-neutral-200 dark:bg-neutral-700' : ''
            }`}
        >
            {/* 팝오버를 여는 버튼 */}
            <button
                ref={buttonRef}
                className="hover:bg-neutral-100 dark:hover:bg-neutral-700 box-content p-2 rounded-lg"
            >
                {button}
            </button>

            {/* 팝오버 내용 
            원래 popupState있던 부분에 isOpen이 있어서 boolean으로 판별했으나,
            현재는 popupState(string)으로 들어가기 때문에 일단 이 로직은 망가짐.
            솔직히 이게 어떻게 지금까지 동작했던건지 모르겠음.
            아예 뜯어서 재설계해야할 것으로 보임.
            
            */}
            {popupState && <div ref={popoverRef}>{children}</div>}
        </div>
    );
};

export default PopupMenu;
