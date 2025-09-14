/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import SearchPage from '@/app/(with-searchbar)/search/page';
import { getMedicineList } from '@/api/drugs';

// API 모듈 mock
jest.mock('@/api/drugs', () => ({
    getMedicineList: jest.fn(),
}));

// 하위 컴포넌트 mock
jest.mock('@/components/common/DrugList', () => {
    const Mock = (props: any) => <div data-testid="drug-list">{JSON.stringify(props.drugs)}</div>;
    Mock.displayName = 'MockDrugList';
    return Mock;
});

jest.mock('@/components/common/Pagination', () => {
    const Mock = (props: any) => <div data-testid="pagination">{JSON.stringify(props)}</div>;
    Mock.displayName = 'MockPagination';
    return Mock;
});

jest.mock('@/components/search/NoContent', () => {
    const Mock = (props: any) => <div data-testid="no-content">{props.keyword || 'NoContent'}</div>;
    Mock.displayName = 'MockNoContent';
    return Mock;
});

jest.mock('@/components/search/SearchHistory', () => {
    const Mock = (props: any) => <div data-testid="search-history">SearchHistory</div>;
    Mock.displayName = 'MockSearchHistory';
    return Mock;
});

jest.mock('@/components/search/SearchResultGuide', () => {
    const Mock = (props: any) => (
        <div data-testid="search-guide">
            Guide: {props.itemName} ({props.length})
        </div>
    );
    Mock.displayName = 'MockSearchResultGuide';
    return Mock;
});

describe('SearchPage', () => {
    it('검색 결과가 있을 때 DrugList, SearchResultGuide, Pagination이 렌더링된다', async () => {
        (getMedicineList as jest.Mock).mockResolvedValueOnce({
            body: {
                items: [
                    { itemSeq: '1', itemName: '타이레놀' },
                    { itemSeq: '2', itemName: '아스피린' },
                ],
                totalCount: 100,
            },
        });

        render(await SearchPage({ searchParams: Promise.resolve({ q: '타이레놀', page: '1' }) }));

        // SearchHistory 항상 렌더링
        expect(screen.getByTestId('search-history')).toBeInTheDocument();

        // SearchResultGuide 표시
        expect(screen.getByTestId('search-guide')).toHaveTextContent('타이레놀');
        expect(screen.getByTestId('search-guide')).toHaveTextContent('(2)');

        // DrugList 데이터 확인
        expect(screen.getByTestId('drug-list')).toHaveTextContent('타이레놀');
        expect(screen.getByTestId('drug-list')).toHaveTextContent('아스피린');

        // Pagination props 확인
        expect(screen.getByTestId('pagination')).toHaveTextContent('"currentPage":1');
        expect(screen.getByTestId('pagination')).toHaveTextContent('"totalCount":100');
    });

    it('검색 결과가 없을 때 NoContent가 렌더링된다', async () => {
        (getMedicineList as jest.Mock).mockResolvedValueOnce({
            body: { items: [], totalCount: 0 },
        });

        render(await SearchPage({ searchParams: Promise.resolve({ q: '없는약', page: '1' }) }));

        // NoContent 렌더링
        expect(screen.getByTestId('no-content')).toHaveTextContent('없는약');

        // Pagination은 항상 존재하지 않음
        expect(screen.queryByTestId('pagination')).toBeNull();
    });
});
