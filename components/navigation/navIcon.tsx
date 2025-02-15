export default function NavIcon({ isMenuOpen }: { isMenuOpen: boolean }) {
    return (
        <svg
            className="w-[26px] h-[26px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
        >
            {isMenuOpen ? (
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.6"
                    d="M6 18 17.94 6M18 18 6.06 6"
                />
            ) : (
                
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.6"
                    d="M5 7h14M5 12h14M5 17h14"
                />
            )}
        </svg>
    );
}
