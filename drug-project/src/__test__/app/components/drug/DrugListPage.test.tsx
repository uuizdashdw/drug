// __tests__/DrugListPage.test.tsx
import { render, screen } from '@testing-library/react';
import DrugListPage from '@/components/drug/DrugListPage';
import { useMedicineList } from '@/hooks/useMedicineList';
import { useErrorModalStore } from '@/store/zustand/common/errorModalState';

// =======================
// 🔹 모듈 모킹
// =======================

// React Query 훅 모킹
jest.mock('@/hooks/useMedicineList', () => {
    return {
        __esModule: true,
        useMedicineList: jest.fn(),
    };
});

// Zustand store 모킹
jest.mock('@/store/zustand/common/errorModalState', () => {
    return {
        __esModule: true,
        useErrorModalStore: jest.fn(),
    };
});

// 하위 컴포넌트 모킹 (displayName + __esModule 보장)
jest.mock('@/components/common/DrugList', () => {
    const Mock = ({ drugs }: { drugs: any[] }) => (
        <div data-testid="drug-list">DrugList Mock ({drugs.length})</div>
    );
    Mock.displayName = 'DrugList';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/Pagination', () => {
    const Mock = ({ currentPage }: { currentPage: number }) => (
        <div data-testid="pagination">Pagination Mock (page={currentPage})</div>
    );
    Mock.displayName = 'Pagination';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/Loading', () => {
    const Mock = () => <div data-testid="loading">Loading Mock</div>;
    Mock.displayName = 'Loading';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/search/NoContent', () => {
    const Mock = () => <div data-testid="no-content">NoContent Mock</div>;
    Mock.displayName = 'NoContent';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/ErrorModal', () => {
    const Mock = () => <div data-testid="error-modal">ErrorModal Mock</div>;
    Mock.displayName = 'ErrorModal';
    return { __esModule: true, default: Mock };
});

// =======================
// 🔹 Mock 참조
// =======================
const mockedUseMedicineList = useMedicineList as unknown as jest.Mock;
const mockedUseErrorModalStore = useErrorModalStore as unknown as jest.Mock;

describe('DrugListPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('로딩 상태일 때 Loading을 렌더링한다', () => {
        mockedUseMedicineList.mockReturnValue({
            data: { body: {} },
            isLoading: true,
            isError: false,
            error: null,
        });
        mockedUseErrorModalStore.mockReturnValue({ open: jest.fn() });

        render(<DrugListPage pageNo={1} />);
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('데이터가 있을 때 DrugList와 Pagination을 렌더링한다', () => {
        mockedUseMedicineList.mockReturnValue({
            data: { body: { items: [{ itemSeq: '1' }, { itemSeq: '2' }], totalCount: 2 } },
            isLoading: false,
            isError: false,
            error: null,
        });
        mockedUseErrorModalStore.mockReturnValue({ open: jest.fn() });

        render(<DrugListPage pageNo={1} />);
        expect(screen.getByTestId('drug-list')).toHaveTextContent('2');
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('데이터가 없으면 NoContent를 렌더링한다', () => {
        mockedUseMedicineList.mockReturnValue({
            data: { body: { items: [] } },
            isLoading: false,
            isError: false,
            error: null,
        });
        mockedUseErrorModalStore.mockReturnValue({ open: jest.fn() });

        render(<DrugListPage pageNo={1} />);
        expect(screen.getByTestId('no-content')).toBeInTheDocument();
    });

    it('에러 발생 시 store.open을 호출하고 ErrorModal을 렌더링한다', () => {
        const openMock = jest.fn();
        mockedUseMedicineList.mockReturnValue({
            data: { body: {} },
            isLoading: false,
            isError: true,
            error: new Error('API 실패'),
        });
        mockedUseErrorModalStore.mockReturnValue({ open: openMock });

        render(<DrugListPage pageNo={1} />);
        expect(openMock).toHaveBeenCalledWith('API 실패');
        expect(screen.getByTestId('error-modal')).toBeInTheDocument();
    });
});
