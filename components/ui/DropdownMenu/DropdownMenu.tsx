import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Link from 'next/link';

interface DropdownItem {
    title: string;
    href: string;
    select?: boolean;
    onClick?: () => void;
    onChange?: () => void;
}

interface DropdownMenuProps {
    label?: React.ReactNode;
    items?: DropdownItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items }) => {
    return (
        <Menu>
            <MenuButton className="hover:bg-neutral-100 dark:hover:bg-neutral-700 box-content p-2 rounded-lg">
                {label}
            </MenuButton>
            <MenuItems
                anchor="bottom"
                className="absolute mt-2 lg:mt-1 right-0 min-w-[120px] w-fit bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm rounded-lg p-2 flex flex-col"
            >
                {items?.map((item, index) => (
                    <Link key={index} href={item.href}>
                        <MenuItem
                            className="flex flex-col space-y-1 p-1"
                            as="button"
                            onClick={item.onClick}
                            onChange={item.onChange}
                        >
                            {item.title}
                        </MenuItem>
                    </Link>
                ))}
            </MenuItems>
        </Menu>
    );
};

export default DropdownMenu;
