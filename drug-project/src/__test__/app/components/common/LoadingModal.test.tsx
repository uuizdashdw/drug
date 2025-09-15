import { render, screen } from '@testing-library/react';
import LoadingModal from '@/components/common/Loading';
import { useLoadingModalStore } from '@/store/zustand/common/loadingModalState';

jest.mock('@/store/zustand/common/loadingModalState', () => {
    return {
        __esModule: true,
        useLoadingModalStore: jest.fn(),
    };
});

const mockedUseLoadingModalStore = useLoadingModalStore as unknown as jest.Mock;

describe('LoadingModal', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('isOpen=false이면 렌더링되지 않는다', () => {
        mockedUseLoadingModalStore.mockReturnValue({
            isOpen: false,
            message: '',
        });

        const { container } = render(<LoadingModal />);
        expect(container).toBeEmptyDOMElement();
    });

    it('isOpen=true이고 message가 있으면 메시지를 표시한다', () => {
        mockedUseLoadingModalStore.mockReturnValue({
            isOpen: true,
            message: '로딩 중...',
        });

        render(<LoadingModal />);
        expect(screen.getByText('로딩 중...')).toBeInTheDocument();
        expect(screen.getByRole('status')).toBeInTheDocument(); // ✅ spinner
    });

    it('isOpen=true이고 message가 없으면 기본 UI만 표시한다', () => {
        mockedUseLoadingModalStore.mockReturnValue({
            isOpen: true,
            message: '',
        });

        const { container } = render(<LoadingModal />);
        const spinner = screen.getByRole('status');
        expect(spinner).toBeInTheDocument();
        // ✅ <p> 태그 존재만 확인
        expect(container.querySelector('p')).toBeInTheDocument();
    });
});
