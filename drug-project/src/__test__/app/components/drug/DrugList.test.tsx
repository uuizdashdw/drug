/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import DrugList from '@/components/common/DrugList';
import { DrugItem } from '@/types/drug';

// DrugItem 모듈 mock (DrugList만 테스트하고 싶을 때)
const MockDrugItem = ({ drug }: any) => <div data-testid="drug-item">{drug.itemName}</div>;
MockDrugItem.displayName = 'MockDrugItem';

jest.mock('@/components/common/DrugItem', () => MockDrugItem);

describe('DrugList Component', () => {
    it('drugs 배열이 주어지면 DrugItem이 개수만큼 렌더링된다', () => {
        const mockDrugs: DrugItem[] = [
            {
                itemSeq: '1',
                itemName: '타이레놀',
                entpName: '한국얀센',
                bizrno: '123-45-6789',
                efcyQesitm: '해열, 진통',
                useMethodQesitm: '1일 3회 복용',
                atpnWarnQesitm: null,
                atpnQesitm: null,
                intrcQesitm: null,
                seQesitm: null,
                depositMethodQesitm: null,
                itemImage: null,
                openDe: null,
                updateDe: null,
            },
            {
                itemSeq: '2',
                itemName: '아스피린',
                entpName: '바이엘',
                bizrno: '234-56-7890',
                efcyQesitm: '혈액 응고 억제',
                useMethodQesitm: '1일 1회 복용',
                atpnWarnQesitm: null,
                atpnQesitm: null,
                intrcQesitm: null,
                seQesitm: null,
                depositMethodQesitm: null,
                itemImage: null,
                openDe: null,
                updateDe: null,
            },
        ];

        render(<DrugList drugs={mockDrugs} />);

        const items = screen.getAllByTestId('drug-item');
        expect(items).toHaveLength(2);
        expect(screen.getByText(/타이레놀/)).toBeInTheDocument();
        expect(screen.getByText(/아스피린/)).toBeInTheDocument();
    });

    it('빈 배열이 주어지면 아무것도 렌더링되지 않는다', () => {
        render(<DrugList drugs={[]} />);
        expect(screen.queryAllByTestId('drug-item')).toHaveLength(0);
    });
});
