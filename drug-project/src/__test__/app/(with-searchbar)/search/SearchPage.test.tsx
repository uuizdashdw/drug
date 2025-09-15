import { render, screen } from '@testing-library/react';
import SearchPage from '@/app/(with-searchbar)/search/page';

// SearchDrugList 모킹
jest.mock('@/components/search/SearchDrugList', () => {
    const MockSearchDrugList = ({ itemName, pageNo }: { itemName: string; pageNo: number }) => {
        return (
            <div data-testid="mock-drug-list">
                DrugList (itemName={itemName}, pageNo={pageNo})
            </div>
        );
    };
    MockSearchDrugList.displayName = 'MockSearchDrugList';
    return { __esModule: true, default: MockSearchDrugList };
});

// SearchHistory 모킹
jest.mock('@/components/search/SearchHistory', () => {
    const MockSearchHistory = () => <div data-testid="mock-history">SearchHistory</div>;
    MockSearchHistory.displayName = 'MockSearchHistory';
    return { __esModule: true, default: MockSearchHistory };
});

describe('SearchPage', () => {
    it('q와 page가 있으면 그대로 내려준다', async () => {
        const props = {
            searchParams: Promise.resolve({ q: '타이레놀', page: '3' }),
        };

        render(await SearchPage(props));

        expect(screen.getByTestId('mock-history')).toBeInTheDocument();
        expect(screen.getByTestId('mock-drug-list')).toHaveTextContent(
            'itemName=타이레놀, pageNo=3',
        );
    });

    it('q와 page가 없으면 기본값으로 렌더링한다', async () => {
        const props = {
            searchParams: Promise.resolve({ q: '' }),
        };

        render(await SearchPage(props));

        expect(screen.getByTestId('mock-history')).toBeInTheDocument();
        expect(screen.getByTestId('mock-drug-list')).toHaveTextContent('itemName=, pageNo=1');
    });
});
