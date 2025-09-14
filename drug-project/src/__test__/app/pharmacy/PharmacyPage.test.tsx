/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PharmacyPage from '@/app/pharmacy/page';

// API 모듈 mock
jest.mock('@/api/pharmacy', () => ({
    getPharmacyList: jest.fn(),
}));

// 하위 컴포넌트 mock
jest.mock('@/components/pharmacy/PharmacyList', () => (props: any) => (
    <div data-testid="pharmacy-list">{JSON.stringify(props.pharmacies)}</div>
));
jest.mock('@/components/common/Pagination', () => (props: any) => (
    <div data-testid="pagination">{JSON.stringify(props)}</div>
));
jest.mock('@/components/search/SearchHistory', () => () => (
    <div data-testid="search-history">SearchHistory</div>
));
jest.mock('@/components/search/NoContent', () => (props: any) => (
    <div data-testid="no-content">{props.keyword}</div>
));

import { getPharmacyList } from '@/api/pharmacy';

describe('PharmacyPage', () => {
    it('API 데이터를 불러오면 PharmacyList와 Pagination이 렌더링된다', async () => {
        (getPharmacyList as jest.Mock).mockResolvedValueOnce({
            response: {
                body: {
                    items: {
                        item: [
                            {
                                yadmNm: '우리약국',
                                addr: '서울시 강남구',
                                postNo: 12345,
                                telno: '02-123-4567',
                            },
                            {
                                yadmNm: '튼튼약국',
                                addr: '서울시 서초구',
                                postNo: 54321,
                                telno: '02-765-4321',
                            },
                        ],
                    },
                    totalCount: 2,
                },
            },
            body: { items: [1, 2] }, // 조건문 통과용
        });

        render(await PharmacyPage({ searchParams: Promise.resolve({ page: '1' }) }));

        expect(screen.getByTestId('search-history')).toBeInTheDocument();
        expect(screen.getByTestId('pharmacy-list')).toHaveTextContent('우리약국');
        expect(screen.getByTestId('pharmacy-list')).toHaveTextContent('튼튼약국');
        expect(screen.getByTestId('pagination')).toHaveTextContent('"currentPage":1');
        expect(screen.getByTestId('pagination')).toHaveTextContent('"totalCount":2');
    });

    it('데이터가 없으면 NoContent가 렌더링된다', async () => {
        (getPharmacyList as jest.Mock).mockResolvedValueOnce({
            response: { body: { items: { item: [] }, totalCount: 0 } },
            body: { items: [] },
        });

        render(await PharmacyPage({ searchParams: Promise.resolve({}) }));

        expect(screen.getByTestId('search-history')).toBeInTheDocument();
        expect(screen.getByTestId('no-content')).toBeInTheDocument();
        expect(screen.getByTestId('no-content')).toHaveTextContent('');
    });
});
