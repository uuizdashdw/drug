/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '@/components/search/SearchBar';

// ---- next/navigation mocks ----
const push = jest.fn();
const prefetch = jest.fn();

import { useSearchParams, usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useRouter: () => ({ push, prefetch }),
    usePathname: jest.fn(),
    useSearchParams: jest.fn(),
}));

// ---- zustand store mock ----
const addQuery = jest.fn();

jest.mock('@/store/zustand/searchKeyword', () => ({
    useSearchStore: () => ({
        addQuery,
    }),
}));

describe('SearchBar', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('placeholder에 type에 맞는 문구가 보인다 (pharmacy)', () => {
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
        (usePathname as jest.Mock).mockReturnValue('/');

        render(<SearchBar type="pharmacy" />);

        expect(screen.getByPlaceholderText('찾고자 하는 약국을 검색해주세요!')).toBeInTheDocument();
    });

    it('Enter 입력 시 handleOnSearch가 실행되어 router.push가 호출된다', () => {
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
        (usePathname as jest.Mock).mockReturnValue('/');

        render(<SearchBar type="medicine" />);

        const input = screen.getByRole('textbox');

        fireEvent.change(input, { target: { value: '타이레놀' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

        expect(addQuery).toHaveBeenCalledWith('타이레놀');
        expect(push).toHaveBeenCalledWith('/search?q=%ED%83%80%EC%9D%B4%EB%A0%88%EB%86%80');
    });

    it('검색 버튼 클릭 시 handleOnSearch가 실행된다', () => {
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
        (usePathname as jest.Mock).mockReturnValue('/search/pharmacy');

        render(<SearchBar type="pharmacy" />);

        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', { name: '검색' });

        fireEvent.change(input, { target: { value: '서울약국' } });
        fireEvent.click(button);

        expect(addQuery).toHaveBeenCalledWith('서울약국');
        expect(push).toHaveBeenCalledWith(
            '/search/pharmacy?q=%EC%84%9C%EC%9A%B8%EC%95%BD%EA%B5%AD&pageNo=1',
        );
    });

    it('searchParams에 q가 있으면 searchValue 초기값이 설정된다', () => {
        (usePathname as jest.Mock).mockReturnValue('/');
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('q=타이레놀'));

        render(<SearchBar type="medicine" />);

        const input = screen.getByRole('textbox');
        expect((input as HTMLInputElement).value).toBe('타이레놀');
    });
});
