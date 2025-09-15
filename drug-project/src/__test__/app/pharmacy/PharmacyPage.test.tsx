import { render, screen } from '@testing-library/react';
import PharmacyPage from '@/app/pharmacy/page';

// PharmacyListPage 모킹
jest.mock('@/components/pharmacy/PharmacyListPage', () => {
    const MockPharmacyListPage = ({ pageNo }: { pageNo: number }) => {
        return <div data-testid="mock-pharmacy-list">PharmacyListPage (pageNo={pageNo})</div>;
    };
    MockPharmacyListPage.displayName = 'MockPharmacyListPage';
    return { __esModule: true, default: MockPharmacyListPage };
});

// SearchHistory 모킹
jest.mock('@/components/search/SearchHistory', () => {
    const MockSearchHistory = () => {
        return <div data-testid="mock-history">SearchHistory</div>;
    };
    MockSearchHistory.displayName = 'MockSearchHistory';
    return { __esModule: true, default: MockSearchHistory };
});

describe('PharmacyPage', () => {
    it('page 파라미터가 있으면 해당 값을 내려준다', async () => {
        const props = {
            searchParams: Promise.resolve({ page: '5' }),
        };

        render(await PharmacyPage(props));

        expect(screen.getByTestId('mock-history')).toBeInTheDocument();
        expect(screen.getByTestId('mock-pharmacy-list')).toHaveTextContent('pageNo=5');
    });

    it('page 파라미터가 없으면 기본값 1로 렌더링한다', async () => {
        const props = {
            searchParams: Promise.resolve({}),
        };

        render(await PharmacyPage(props));

        expect(screen.getByTestId('mock-history')).toBeInTheDocument();
        expect(screen.getByTestId('mock-pharmacy-list')).toHaveTextContent('pageNo=1');
    });
});
