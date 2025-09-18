// __tests__/DrugListPage.test.tsx
import { render, screen } from '@testing-library/react';
import DrugListPage from '@/components/drug/DrugListPage';
import { useMedicineList } from '@/hooks/useMedicineList';

// =======================
// 모듈 모킹
// =======================
jest.mock('@/hooks/useMedicineList', () => ({
    __esModule: true,
    useMedicineList: jest.fn(),
}));

// useErrorModalStore → 그냥 jest.fn으로 치환
const openMock = jest.fn();
jest.mock('@/store/zustand/common/errorModalState', () => ({
    __esModule: true,
    useErrorModalStore: () => ({ open: openMock }),
}));

jest.mock('@/components/common/DrugList', () => {
    const Mock = ({ drugs }: { drugs: any[] }) => (
        <div data-testid="drug-list">DrugList Mock ({drugs.length})</div>
    );
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/Pagination', () => {
    const Mock = ({ currentPage }: { currentPage: number }) => (
        <div data-testid="pagination">Pagination Mock (page={currentPage})</div>
    );
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/Loading', () => {
    const Mock = () => <div data-testid="loading">Loading Mock</div>;
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/search/NoContent', () => {
    const Mock = ({ keyword }: { keyword: string }) => (
        <div data-testid="no-content">{`NoContent Mock: ${keyword}`}</div>
    );
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/ErrorModal', () => {
    const Mock = () => <div data-testid="error-modal">ErrorModal Mock</div>;
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/ListSkeleton', () => {
    const Mock = () => <div data-testid="list-skeleton">ListSkeleton Mock</div>;
    return { __esModule: true, default: Mock };
});

// =======================
// 테스트
// =======================
describe('DrugListPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('로딩 상태일 때 Loading을 렌더링한다', () => {
        (useMedicineList as jest.Mock).mockReturnValue({
            data: { body: {} },
            isLoading: true,
            isError: false,
            error: null,
        });

        render(<DrugListPage pageNo={1} />);
        expect(screen.getByTestId('loading')).toBeInTheDocument();
        expect(screen.getByTestId('list-skeleton')).toBeInTheDocument();
    });

    it('데이터가 있을 때 DrugList와 Pagination을 렌더링한다', () => {
        (useMedicineList as jest.Mock).mockReturnValue({
            data: { body: { items: [{ itemSeq: '1' }, { itemSeq: '2' }], totalCount: 2 } },
            isLoading: false,
            isError: false,
            error: null,
        });

        render(<DrugListPage pageNo={1} />);
        expect(screen.getByTestId('drug-list')).toHaveTextContent('2');
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('데이터가 없으면 NoContent를 렌더링한다', () => {
        (useMedicineList as jest.Mock).mockReturnValue({
            data: { body: { items: [] } },
            isLoading: false,
            isError: false,
            error: null,
        });

        render(<DrugListPage pageNo={1} />);
        expect(screen.getByTestId('no-content')).toBeInTheDocument();
    });

    it('에러 발생 시 store.open을 호출하고 ErrorModal을 렌더링한다', () => {
        (useMedicineList as jest.Mock).mockReturnValue({
            data: { body: {} },
            isLoading: false,
            isError: true,
            error: new Error('API 실패'),
        });

        render(<DrugListPage pageNo={1} />);
        expect(openMock).toHaveBeenCalledWith('API 실패');
        expect(screen.getByTestId('error-modal')).toBeInTheDocument();
    });
});
