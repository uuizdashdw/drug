import { create } from 'zustand';

interface LoadingModalState {
    isOpen: boolean;
    message: string;
    open: (message: string) => void;
    close: () => void;
}

export const useLoadingModalStore = create<LoadingModalState>((set) => ({
    isOpen: false,
    message: '',
    open: (message = '로딩 중 입니다...') => set({ isOpen: true, message }),
    close: () => set({ isOpen: false, message: '' }),
}));
