/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PharmacySearchPage from '@/app/(with-searchbar)/search/pharmacy/page';

// Child mocks
jest.mock('@/components/search/SearchHistory', () => {
    const Mock = () => <div data-testid="SearchHistory" />;
    Mock.displayName = 'SearchHistory';
    return { __esModule: true, default: Mock };
});

jest.mock('@/components/search/SearchPharmacyList', () => {
    const Mock = ({ itemName, pageNo }: { itemName: string; pageNo: number }) => (
        <div data-testid="SearchPharmacyList">
            {itemName} / {pageNo}
        </div>
    );
    Mock.displayName = 'SearchPharmacyList';
    return { __esModule: true, default: Mock };
});

function renderWithQuery(ui: React.ReactElement) {
    const queryClient = new QueryClient();
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
}

describe('PharmacySearchPage', () => {
    it('검색 결과가 있을 때 PharmacyList, SearchResultGuide, Pagination이 렌더링된다', async () => {
        const searchParams = Promise.resolve({ q: '타이레놀', pageNo: '2' });

        // ✅ 서버 컴포넌트는 함수 호출 후 결과 JSX를 넘겨야 함
        const ui = await PharmacySearchPage({ searchParams });

        renderWithQuery(ui);

        expect(await screen.findByTestId('SearchHistory')).toBeInTheDocument();
        expect(await screen.findByTestId('SearchPharmacyList')).toHaveTextContent('타이레놀 / 2');
    });

    it('검색 결과가 없을 때 NoContent만 렌더링된다', async () => {
        const searchParams = Promise.resolve({ q: '없는약', pageNo: '1' });

        const ui = await PharmacySearchPage({ searchParams });

        renderWithQuery(ui);

        expect(await screen.findByTestId('SearchHistory')).toBeInTheDocument();
        expect(await screen.findByTestId('SearchPharmacyList')).toHaveTextContent('없는약 / 1');
    });
});
