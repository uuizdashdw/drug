/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Home from '@/app/(with-searchbar)/page';

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

jest.mock('@/components/search/SearchHistory', () => {
    const Mock = (props: any) => <div data-testid="search-history">SearchHistory</div>;
    Mock.displayName = 'MockSearchHistory';
    return Mock;
});

import { getMedicineList } from '@/api/drugs';

describe('Home Page', () => {
    it('API 데이터를 불러오고 DrugList, Pagination, SearchHistory가 렌더링된다', async () => {
        (getMedicineList as jest.Mock).mockResolvedValueOnce({
            body: {
                items: [
                    { itemSeq: '1', itemName: '타이레놀' },
                    { itemSeq: '2', itemName: '아스피린' },
                ],
                totalCount: 200,
            },
        });

        render(await Home({ searchParams: Promise.resolve({ page: '2' }) }));

        // SearchHistory 확인
        expect(screen.getByTestId('search-history')).toBeInTheDocument();

        // DrugList props 확인
        expect(screen.getByTestId('drug-list')).toHaveTextContent('타이레놀');
        expect(screen.getByTestId('drug-list')).toHaveTextContent('아스피린');

        // Pagination props 확인
        expect(screen.getByTestId('pagination')).toHaveTextContent('"currentPage":2');
        expect(screen.getByTestId('pagination')).toHaveTextContent('"totalCount":200');
        expect(screen.getByTestId('pagination')).toHaveTextContent('"pageSize":12');
    });

    it('데이터가 없으면 DrugList와 Pagination이 렌더링되지 않는다', async () => {
        (getMedicineList as jest.Mock).mockResolvedValueOnce({
            body: { items: [], totalCount: 0 },
        });

        render(await Home({ searchParams: Promise.resolve({}) }));

        // DrugList와 Pagination이 없어야 한다
        expect(screen.queryByTestId('drug-list')).toBeNull();
        expect(screen.queryByTestId('pagination')).toBeNull();
    });
});
