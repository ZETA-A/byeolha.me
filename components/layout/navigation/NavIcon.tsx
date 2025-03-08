import { Bars, Close } from 'flowbite-react-icons/outline';

export default function NavIcon({ isMenuOpen }: { isMenuOpen: boolean }) {
    if (isMenuOpen) {
        return <Close />;
    } else {
        return <Bars />;
    }
}
