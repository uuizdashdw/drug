/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DrugItem from '@/components/common/DrugItem';
import { DrugItemType } from '@/types/drug';

jest.mock('next/link', () => {
    const MockLink = ({ children, href, ...rest }: any) => (
        <a href={href} {...rest}>
            {children}
        </a>
    );
    MockLink.displayName = 'MockLink';

    return {
        __esModule: true,
        default: MockLink,
    };
});

// 이미지
jest.mock('next/image', () => {
    const MockImage = (props: any) => {
        const { fill, alt = 'mock-image', ...rest } = props;
        return <img alt={alt} {...rest} />;
    };
    MockImage.displayName = 'MockImage';

    return {
        __esModule: true,
        default: MockImage,
    };
});

// ✅ Zustand store mock
const addItemMock = jest.fn();
jest.mock('@/store/zustand/searchKeyword', () => ({
    useSearchStore: () => ({ addItem: addItemMock }),
}));

describe('DrugItem Component', () => {
    const mockDrug: DrugItemType = {
        itemSeq: '12345',
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
        itemImage: '/test.png',
        openDe: null,
        updateDe: '2025-09-14',
    };

    it('약 이름이 화면에 표시된다', async () => {
        render(<DrugItem drug={mockDrug} />);
        fireEvent.load(screen.getByAltText(/타이레놀/)); // 이미지 load 이벤트 강제 실행
        expect(await screen.findByText(/타이레놀/)).toBeInTheDocument();
    });

    it('이미지가 약 이름을 alt로 가진다', () => {
        render(<DrugItem drug={mockDrug} />);
        expect(screen.getByAltText(/타이레놀/)).toBeInTheDocument();
    });

    it('Link가 올바른 href를 가진다', () => {
        render(<DrugItem drug={mockDrug} />);
        expect(screen.getByRole('link')).toHaveAttribute('href', '/drug/12345');
    });

    it('클릭 시 addItem이 호출된다', () => {
        render(<DrugItem drug={mockDrug} />);
        fireEvent.click(screen.getByRole('link'));

        expect(addItemMock).toHaveBeenCalledWith(
            expect.objectContaining({ itemName: '타이레놀', type: 'drug' }),
        );
    });
});
