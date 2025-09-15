import { useErrorModalStore } from '@/store/zustand/common/errorModalState';

export default function ErrorModal() {
    const { isOpen, message, close } = useErrorModalStore();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-2 text-lg font-bold">에러 발생</h2>
                <p className="mb-4">{message || '데이터를 불러오는 중 오류가 발생했습니다.'}</p>
                <button
                    onClick={close}
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                    닫기
                </button>
            </div>
        </div>
    );
}
