import { create } from 'zustand';

interface ErrorModalState {
    isOpen: boolean;
    message: string;
    open: (message: string) => void;
    close: () => void;
}

export const useErrorModalStore = create<ErrorModalState>((set) => ({
    isOpen: false,
    message: '',
    open: (message) => set({ isOpen: true, message }),
    close: () => set({ isOpen: false, message: '' }),
}));
