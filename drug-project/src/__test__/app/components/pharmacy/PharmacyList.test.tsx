/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PharmacyList from '@/components/pharmacy/PharmacyList';
import { PharmacyItem } from '@/types/pharmacy';

// PharmacyItem 컴포넌트를 mock 처리 (PharmacyList만 검증)
jest.mock('@/components/pharmacy/PharmacyItem', () => {
    return function MockPharmacyItem({ item }: { item: PharmacyItem }) {
        return <li data-testid="pharmacy-item">{item.yadmNm}</li>;
    };
});

describe('PharmacyList Component', () => {
    const mockPharmacies: PharmacyItem[] = [
        {
            addr: '서울시 강남구 테헤란로 1',
            clCd: 11,
            clCdNm: '약국',
            emdongNm: '역삼동',
            estbDd: 20200101,
            postNo: 12345,
            sgguCd: 101,
            sgguCdNm: '강남구',
            sidoCd: 11,
            sidoCdNm: '서울특별시',
            telno: '02-123-4567',
            XPos: 127.0276,
            YPos: 37.4979,
            yadmNm: '우리약국',
            ykiho: 'ENC001',
        },
        {
            addr: '서울시 송파구 올림픽로 2',
            clCd: 11,
            clCdNm: '약국',
            emdongNm: '잠실동',
            estbDd: 20191212,
            postNo: 54321,
            sgguCd: 102,
            sgguCdNm: '송파구',
            sidoCd: 11,
            sidoCdNm: '서울특별시',
            telno: '02-987-6543',
            XPos: 127.1,
            YPos: 37.5112,
            yadmNm: '튼튼약국',
            ykiho: 'ENC002',
        },
    ];

    it('pharmacies 배열이 주어지면 PharmacyItem이 개수만큼 렌더링된다', () => {
        render(<PharmacyList pharmacies={mockPharmacies} />);

        const items = screen.getAllByTestId('pharmacy-item');
        expect(items).toHaveLength(2);

        expect(screen.getByText(/우리약국/)).toBeInTheDocument();
        expect(screen.getByText(/튼튼약국/)).toBeInTheDocument();
    });

    it('빈 배열이 주어지면 아무것도 렌더링되지 않는다', () => {
        render(<PharmacyList pharmacies={[]} />);
        expect(screen.queryAllByTestId('pharmacy-item')).toHaveLength(0);
    });
});
