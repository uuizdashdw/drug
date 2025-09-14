/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentViewed from '@/components/common/RecentViewed';
import { useSearchStore } from '@/store/zustand/searchKeyword';

// ✅ Zustand store 모킹
jest.mock('@/store/zustand/searchKeyword', () => ({
    useSearchStore: jest.fn(),
}));

// ✅ 타입 안전한 mock 참조
const mockedUseSearchStore = jest.mocked(useSearchStore);

describe('RecentViewed Component', () => {
    const mockClearItems = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('recentItems가 없으면 렌더링되지 않는다', () => {
        mockedUseSearchStore.mockReturnValue({
            recentItems: [],
            clearItems: mockClearItems,
        } as any);

        const { container } = render(<RecentViewed />);
        expect(container.firstChild).toBeNull();
    });

    it('약국 아이템이 있으면 약국 링크가 표시된다', () => {
        mockedUseSearchStore.mockReturnValue({
            recentItems: [{ type: 'pharmacy', ykiho: 'abc123', yadmNm: '우리약국' }],
            clearItems: mockClearItems,
        } as any);

        render(<RecentViewed />);
        expect(screen.getByText(/우리약국/)).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/pharmacy/abc123');
    });

    it('약물 아이템이 있으면 약물 링크가 표시된다', () => {
        mockedUseSearchStore.mockReturnValue({
            recentItems: [{ type: 'drug', itemSeq: '98765', itemName: '타이레놀' }],
            clearItems: mockClearItems,
        } as any);

        render(<RecentViewed />);
        expect(screen.getByText(/타이레놀/)).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/drug/98765');
    });

    it('"전체 지우기" 버튼을 누르면 clearItems가 호출된다', () => {
        mockedUseSearchStore.mockReturnValue({
            recentItems: [{ type: 'drug', itemSeq: '98765', itemName: '타이레놀' }],
            clearItems: mockClearItems,
        } as any);

        render(<RecentViewed />);
        fireEvent.click(screen.getByText(/전체 지우기/));
        expect(mockClearItems).toHaveBeenCalledTimes(1);
    });
});
