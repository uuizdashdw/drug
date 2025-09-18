/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import SearchPharmacyList from '@/components/search/SearchPharmacyList';
import { usePharmacyList } from '@/hooks/usePharmacyList';

// hooks mock
jest.mock('@/hooks/usePharmacyList', () => ({
    usePharmacyList: jest.fn(),
}));

// Zustand mock
jest.mock('@/store/zustand/common/errorModalState', () => ({
    useErrorModalStore: () => ({
        open: jest.fn(),
    }),
}));

// -------- Child components mock (내부 선언 + displayName) --------
jest.mock('@/components/search/SearchResultGuide', () => {
    const Mock = ({ itemName, totalCount }: { itemName: string; totalCount: number }) => (
        <div data-testid="SearchResultGuide">
            {itemName} / {totalCount}
        </div>
    );
    Mock.displayName = 'SearchResultGuide';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/pharmacy/PharmacyList', () => {
    const Mock = ({ pharmacies }: { pharmacies: any[] }) => (
        <div data-testid="PharmacyList">{`pharmacies: ${pharmacies.length}`}</div>
    );
    Mock.displayName = 'PharmacyList';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/search/NoContent', () => {
    const Mock = ({ keyword }: { keyword: string }) => (
        <div data-testid="NoContent">{`no result: ${keyword}`}</div>
    );
    Mock.displayName = 'NoContent';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/Pagination', () => {
    const Mock = ({ currentPage, totalCount }: { currentPage: number; totalCount: number }) => (
        <div data-testid="Pagination">
            page {currentPage} / total {totalCount}
        </div>
    );
    Mock.displayName = 'Pagination';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/ListSkeleton', () => {
    const Mock = () => <div data-testid="ListSkeleton" />;
    Mock.displayName = 'ListSkeleton';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/Loading', () => {
    const Mock = () => <div data-testid="LoadingModal" />;
    Mock.displayName = 'LoadingModal';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/common/ErrorModal', () => {
    const Mock = () => <div data-testid="ErrorModal" />;
    Mock.displayName = 'ErrorModal';
    return { __esModule: true, default: Mock };
});
// ----------------------------------------------------------------

describe('SearchPharmacyList', () => {
    it('약국 리스트와 Pagination이 렌더링된다 (데이터 있음)', () => {
        (usePharmacyList as jest.Mock).mockReturnValue({
            data: { response: { body: { items: { item: [{ id: 1 }] }, totalCount: 5 } } },
            isLoading: false,
            isError: false,
            error: null,
        });

        render(<SearchPharmacyList itemName="타이레놀약국" pageNo={1} />);

        expect(screen.getByTestId('SearchResultGuide')).toHaveTextContent('타이레놀약국 / 5');
        expect(screen.getByTestId('PharmacyList')).toHaveTextContent('pharmacies: 1');
        expect(screen.getByTestId('Pagination')).toHaveTextContent('page 1 / total 5');
    });

    it('로딩 중이고 데이터 없을 때 스켈레톤과 로딩 모달 렌더링', () => {
        (usePharmacyList as jest.Mock).mockReturnValue({
            data: { response: { body: { items: { item: [] } } } },
            isLoading: true,
            isError: false,
            error: null,
        });

        render(<SearchPharmacyList itemName="타이레놀약국" pageNo={1} />);

        expect(screen.getByTestId('ListSkeleton')).toBeInTheDocument();
        expect(screen.getByTestId('LoadingModal')).toBeInTheDocument();
    });

    it('데이터 없고 로딩 아님 → NoContent 렌더링', () => {
        (usePharmacyList as jest.Mock).mockReturnValue({
            data: { response: { body: { items: { item: [] } } } },
            isLoading: false,
            isError: false,
            error: null,
        });

        render(<SearchPharmacyList itemName="없는약국" pageNo={1} />);

        expect(screen.getByTestId('NoContent')).toHaveTextContent('없는약국');
    });
});
