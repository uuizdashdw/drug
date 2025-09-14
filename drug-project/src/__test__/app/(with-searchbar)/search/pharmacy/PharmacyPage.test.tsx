/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PharmacySearchPage from '@/app/(with-searchbar)/search/pharmacy/page';
import { getPharmacyList } from '@/api/pharmacy';

// API mock
jest.mock('@/api/pharmacy', () => ({
    getPharmacyList: jest.fn(),
}));

// 하위 컴포넌트 mock
jest.mock('@/components/pharmacy/PharmacyList', () => {
    const Mock = (props: any) => (
        <div data-testid="pharmacy-list">{JSON.stringify(props.pharmacies)}</div>
    );
    Mock.displayName = 'MockPharmacyList';
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
    const Mock = () => <div data-testid="search-history">SearchHistory</div>;
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

describe('PharmacySearchPage', () => {
    it('검색 결과가 있을 때 PharmacyList, SearchResultGuide, Pagination이 렌더링된다', async () => {
        (getPharmacyList as jest.Mock).mockResolvedValueOnce({
            response: {
                body: {
                    items: {
                        item: [
                            { yadmNm: '우리약국', addr: '서울시 강남구' },
                            { yadmNm: '동네약국', addr: '서울시 서초구' },
                        ],
                    },
                    totalCount: 50,
                },
            },
        });

        render(
            await PharmacySearchPage({
                searchParams: Promise.resolve({ q: '우리약국', pageNo: '1' }),
            }),
        );

        // SearchHistory
        expect(screen.getByTestId('search-history')).toBeInTheDocument();

        // SearchResultGuide
        expect(screen.getByTestId('search-guide')).toHaveTextContent('우리약국');
        expect(screen.getByTestId('search-guide')).toHaveTextContent('(2)');

        // PharmacyList
        expect(screen.getByTestId('pharmacy-list')).toHaveTextContent('우리약국');
        expect(screen.getByTestId('pharmacy-list')).toHaveTextContent('동네약국');

        // Pagination
        expect(screen.getByTestId('pagination')).toHaveTextContent('"currentPage":1');
        expect(screen.getByTestId('pagination')).toHaveTextContent('"totalCount":50');
    });

    it('검색 결과가 없을 때 NoContent만 렌더링되고 Pagination은 표시되지 않는다', async () => {
        (getPharmacyList as jest.Mock).mockResolvedValueOnce({
            response: {
                body: {
                    items: { item: [] },
                    totalCount: 0,
                },
            },
        });

        render(
            await PharmacySearchPage({
                searchParams: Promise.resolve({ q: '없는약국', pageNo: '1' }),
            }),
        );

        // NoContent
        expect(screen.getByTestId('no-content')).toHaveTextContent('없는약국');

        // Pagination은 없어야 함
        expect(screen.queryByTestId('pagination')).toBeNull();
    });
});
