import { render, screen } from '@testing-library/react';
import SearchDrugList from '@/components/search/SearchDrugList';
import { useMedicineList } from '@/hooks/useMedicineList';

// ---------- Hooks 모킹 ----------
jest.mock('@/hooks/useMedicineList');
const mockUseMedicineList = useMedicineList as jest.MockedFunction<typeof useMedicineList>;

// ---------- Zustand 모킹 ----------
jest.mock('@/store/zustand/common/errorModalState', () => ({
    useErrorModalStore: () => ({ open: jest.fn() }),
}));

// ---------- 하위 컴포넌트 모킹 ----------
jest.mock('@/components/common/DrugList', () => {
    const Mock = ({ drugs }: any) => (
        <div data-testid="mock-druglist">DrugList length={drugs.length}</div>
    );
    Mock.displayName = 'MockDrugList';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/search/SearchResultGuide', () => {
    const Mock = ({ itemName, length }: any) => (
        <div data-testid="mock-result-guide">
            SearchResultGuide {itemName} {length}
        </div>
    );
    Mock.displayName = 'MockSearchResultGuide';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/search/NoContent', () => {
    const Mock = ({ keyword }: { keyword: string }) => (
        <div data-testid="mock-nocontent">NoContent {keyword}</div>
    );
    Mock.displayName = 'MockNoContent';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/Pagination', () => {
    const Mock = ({ currentPage, totalCount }: any) => (
        <div data-testid="mock-pagination">
            Pagination {currentPage}/{totalCount}
        </div>
    );
    Mock.displayName = 'MockPagination';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/Loading', () => {
    const Mock = () => <div data-testid="mock-loading">Loading</div>;
    Mock.displayName = 'MockLoading';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/ErrorModal', () => {
    const Mock = () => <div data-testid="mock-error-modal">ErrorModal</div>;
    Mock.displayName = 'MockErrorModal';
    return { __esModule: true, default: Mock };
});

// ---------- 테스트 ----------
describe('SearchDrugList', () => {
    it('약 데이터가 있으면 DrugList와 Pagination, SearchResultGuide가 렌더링된다', () => {
        mockUseMedicineList.mockReturnValue({
            data: { body: { items: [{ id: 1 }, { id: 2 }], totalCount: 2 } },
            isLoading: false,
            isError: false,
            error: null,
        } as any);

        render(<SearchDrugList itemName="타이레놀" pageNo={1} />);

        expect(screen.getByTestId('mock-result-guide')).toBeInTheDocument();
        expect(screen.getByTestId('mock-druglist')).toHaveTextContent('length=2');
        expect(screen.getByTestId('mock-pagination')).toHaveTextContent('Pagination 1/2');
    });

    it('약 데이터가 없으면 NoContent가 렌더링된다', () => {
        mockUseMedicineList.mockReturnValue({
            data: { body: { items: [], totalCount: 0 } },
            isLoading: false,
            isError: false,
            error: null,
        } as any);

        render(<SearchDrugList itemName="없는약" pageNo={1} />);

        expect(screen.getByTestId('mock-nocontent')).toHaveTextContent('NoContent 없는약');
    });

    it('로딩 중이면 LoadingModal이 렌더링된다', () => {
        mockUseMedicineList.mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false,
            error: null,
        } as any);

        render(<SearchDrugList itemName="타이레놀" pageNo={1} />);

        expect(screen.getByTestId('mock-loading')).toBeInTheDocument();
    });
});
