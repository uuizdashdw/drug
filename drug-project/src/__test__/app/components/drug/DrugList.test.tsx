import { render, screen } from '@testing-library/react';
import DrugList from '@/components/common/DrugList';
import type { DrugListProps } from '@/types/drug';

jest.mock('@/components/common/DrugItem', () => {
    const MockDrugItem = ({ drug }: { drug: any }) => (
        <div data-testid="drug-item">{drug.itemName}</div>
    );
    MockDrugItem.displayName = 'DrugItem'; // 👈 이름 고정
    return { __esModule: true, default: MockDrugItem };
});

describe('DrugList', () => {
    it('drugs 배열만큼 DrugItem을 렌더링한다', () => {
        const drugs: DrugListProps['drugs'] = [
            { itemSeq: '1', itemName: '타이레놀' },
            { itemSeq: '2', itemName: '아스피린' },
        ] as any;

        render(<DrugList drugs={drugs} />);

        const items = screen.getAllByTestId('drug-item');
        expect(items).toHaveLength(2);
        expect(screen.getByText('타이레놀')).toBeInTheDocument();
        expect(screen.getByText('아스피린')).toBeInTheDocument();
    });

    it('drugs가 빈 배열이면 DrugItem이 렌더링되지 않는다', () => {
        render(<DrugList drugs={[]} />);
        expect(screen.queryAllByTestId('drug-item')).toHaveLength(0);
    });
});
