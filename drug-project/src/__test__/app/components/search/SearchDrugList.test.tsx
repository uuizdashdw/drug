/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import SearchDrugList from '@/components/search/SearchDrugList';
import { useMedicineList } from '@/hooks/useMedicineList';

// hooks mock
jest.mock('@/hooks/useMedicineList', () => ({
    useMedicineList: jest.fn(),
}));

jest.mock('@/store/zustand/common/errorModalState', () => ({
    useErrorModalStore: () => ({
        open: jest.fn(),
    }),
}));

// ---------- Child Components Mock (내부 선언 + displayName) ----------
jest.mock('@/components/common/DrugList', () => {
    const DrugListMock = ({ drugs }: { drugs: any[] }) => (
        <div data-testid="DrugList">{`drugs: ${drugs.length}`}</div>
    );
    DrugListMock.displayName = 'DrugList';
    return { __esModule: true, default: DrugListMock };
});

jest.mock('@/components/search/SearchResultGuide', () => {
    const SearchResultGuideMock = ({
        itemName,
        totalCount,
    }: {
        itemName: string;
        totalCount: number;
    }) => (
        <div data-testid="SearchResultGuide">
            {itemName} / {totalCount}
        </div>
    );
    SearchResultGuideMock.displayName = 'SearchResultGuide';
    return { __esModule: true, default: SearchResultGuideMock };
});

jest.mock('@/components/search/NoContent', () => {
    const NoContentMock = ({ keyword }: { keyword: string }) => (
        <div data-testid="NoContent">{`no result: ${keyword}`}</div>
    );
    NoContentMock.displayName = 'NoContent';
    return { __esModule: true, default: NoContentMock };
});

jest.mock('@/components/common/Pagination', () => {
    const PaginationMock = ({
        currentPage,
        totalCount,
    }: {
        currentPage: number;
        totalCount: number;
    }) => (
        <div data-testid="Pagination">
            page {currentPage} / total {totalCount}
        </div>
    );
    PaginationMock.displayName = 'Pagination';
    return { __esModule: true, default: PaginationMock };
});

jest.mock('@/components/common/Loading', () => {
    const LoadingModalMock = () => <div data-testid="LoadingModal" />;
    LoadingModalMock.displayName = 'LoadingModal';
    return { __esModule: true, default: LoadingModalMock };
});

jest.mock('@/components/common/ErrorModal', () => {
    const ErrorModalMock = () => <div data-testid="ErrorModal" />;
    ErrorModalMock.displayName = 'ErrorModal';
    return { __esModule: true, default: ErrorModalMock };
});

jest.mock('@/components/common/ListSkeleton', () => {
    const ListSkeletonMock = () => <div data-testid="ListSkeleton" />;
    ListSkeletonMock.displayName = 'ListSkeleton';
    return { __esModule: true, default: ListSkeletonMock };
});
// -------------------------------------------------------------------

describe('SearchDrugList', () => {
    it('renders DrugList and Pagination when data is loaded', () => {
        (useMedicineList as jest.Mock).mockReturnValue({
            data: { body: { items: [{ id: 1 }], totalCount: 10 } },
            isLoading: false,
            isError: false,
            error: null,
        });

        render(<SearchDrugList itemName="타이레놀" pageNo={1} />);

        expect(screen.getByTestId('SearchResultGuide')).toHaveTextContent('타이레놀 / 10');
        expect(screen.getByTestId('DrugList')).toHaveTextContent('drugs: 1');
        expect(screen.getByTestId('Pagination')).toHaveTextContent('page 1 / total 10');
    });

    it('renders skeleton when loading with no data', () => {
        (useMedicineList as jest.Mock).mockReturnValue({
            data: { body: { items: [] } },
            isLoading: true,
            isError: false,
            error: null,
        });

        render(<SearchDrugList itemName="타이레놀" pageNo={1} />);

        expect(screen.getByTestId('ListSkeleton')).toBeInTheDocument();
        expect(screen.getByTestId('LoadingModal')).toBeInTheDocument();
    });

    it('renders NoContent when no results', () => {
        (useMedicineList as jest.Mock).mockReturnValue({
            data: { body: { items: [] } },
            isLoading: false,
            isError: false,
            error: null,
        });

        render(<SearchDrugList itemName="비존재" pageNo={1} />);

        expect(screen.getByTestId('NoContent')).toHaveTextContent('비존재');
    });
});
