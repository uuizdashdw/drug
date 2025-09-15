'use client';

import { useLoadingModalStore } from '@/store/zustand/common/loadingModalState';

export default function LoadingModal() {
    const { isOpen, message } = useLoadingModalStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="flex flex-col items-center rounded-lg bg-white px-6 py-4 shadow-lg">
                <div
                    role="status"
                    aria-label="loading"
                    className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"
                />
                <p className="text-sm text-gray-700">{message}</p>
            </div>
        </div>
    );
}
