// __tests__/ErrorModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorModal from '@/components/common/ErrorModal';
import { useErrorModalStore } from '@/store/zustand/common/errorModalState';

// Zustand store 모킹
jest.mock('@/store/zustand/common/errorModalState', () => {
    return {
        __esModule: true,
        useErrorModalStore: jest.fn(),
    };
});

const mockedUseErrorModalStore = useErrorModalStore as unknown as jest.Mock;

describe('ErrorModal', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('isOpen=false일 때 렌더링되지 않는다', () => {
        mockedUseErrorModalStore.mockReturnValue({
            isOpen: false,
            message: '',
            close: jest.fn(),
        });

        const { container } = render(<ErrorModal />);
        expect(container).toBeEmptyDOMElement();
    });

    it('isOpen=true + message 있을 때 해당 메시지를 표시한다', () => {
        mockedUseErrorModalStore.mockReturnValue({
            isOpen: true,
            message: '테스트 에러 메시지',
            close: jest.fn(),
        });

        render(<ErrorModal />);
        expect(screen.getByText('테스트 에러 메시지')).toBeInTheDocument();
        expect(screen.getByText('에러 발생')).toBeInTheDocument();
    });

    it('isOpen=true + message 없을 때 기본 메시지를 표시한다', () => {
        mockedUseErrorModalStore.mockReturnValue({
            isOpen: true,
            message: '',
            close: jest.fn(),
        });

        render(<ErrorModal />);
        expect(screen.getByText('데이터를 불러오는 중 오류가 발생했습니다.')).toBeInTheDocument();
    });

    it('닫기 버튼을 클릭하면 close 함수가 호출된다', () => {
        const closeMock = jest.fn();
        mockedUseErrorModalStore.mockReturnValue({
            isOpen: true,
            message: '테스트 에러',
            close: closeMock,
        });

        render(<ErrorModal />);
        fireEvent.click(screen.getByText('닫기'));
        expect(closeMock).toHaveBeenCalledTimes(1);
    });
});
