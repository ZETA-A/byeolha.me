import { create } from 'zustand';

export enum PopupMenuState {
    Language = 'language',
    Theme = 'theme',
    Navigation = 'navigation',
    None = 'none',
}

interface PopupMenuStore {
    popupMenuState: PopupMenuState;
    setPopupMenuState: (state: PopupMenuState) => void;
}

const usePopupMenuStore = create<PopupMenuStore>((set, get) => ({
    popupMenuState: PopupMenuState.None,
    setPopupMenuState: (state) => {
        const currentPopupState = get().popupMenuState;
        if (currentPopupState === state) {
            set({ popupMenuState: PopupMenuState.None });
        } else {
            set({ popupMenuState: state });
        }
    },
}));

export default usePopupMenuStore;
