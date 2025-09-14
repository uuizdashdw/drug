/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '@/components/common/Pagination';

// ✅ 모듈 전체를 import한 후 mock 사용
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(() => '/'),
}));

jest.mock('@/store/zustand/searchKeyword', () => ({
    useSearchStore: jest.fn(() => ({ queries: ['타이레놀', '아스피린'] })),
}));

describe('Pagination Component', () => {
    beforeEach(() => {
        // 기본값 리셋
        (usePathname as jest.Mock).mockReturnValue('/');
    });

    it('총 페이지가 1 이하이면 렌더링되지 않는다', () => {
        const { container } = render(<Pagination currentPage={1} pageSize={20} totalCount={10} />);
        expect(container.firstChild).toBeNull();
    });

    it('페이지 버튼들이 렌더링된다', () => {
        render(<Pagination currentPage={1} pageSize={10} totalCount={30} />);
        expect(screen.getByTestId('page-button-1')).toBeInTheDocument();
        expect(screen.getByTestId('page-button-3')).toBeInTheDocument();
    });

    it('현재 페이지 버튼이 강조 표시된다', () => {
        render(<Pagination currentPage={2} pageSize={10} totalCount={30} />);
        expect(screen.getByTestId('page-button-2')).toHaveClass('bg-brand-300 text-white');
    });

    it('이전/다음 버튼이 조건에 따라 보인다', () => {
        const { rerender } = render(<Pagination currentPage={1} pageSize={10} totalCount={30} />);
        expect(screen.queryByTestId('prev-button')).not.toBeInTheDocument();
        expect(screen.getByTestId('next-button')).toBeInTheDocument();

        rerender(<Pagination currentPage={3} pageSize={10} totalCount={30} />);
        expect(screen.getByTestId('prev-button')).toBeInTheDocument();
        expect(screen.queryByTestId('next-button')).not.toBeInTheDocument();
    });

    it('pathName이 /search일 때 query 문자열이 포함된다', () => {
        (usePathname as jest.Mock).mockReturnValue('/search');

        render(<Pagination currentPage={1} pageSize={10} totalCount={20} />);
        const firstPage = screen.getByTestId('page-button-1').closest('a');

        expect(firstPage?.getAttribute('href')).toContain('Prduct=');
    });
});
