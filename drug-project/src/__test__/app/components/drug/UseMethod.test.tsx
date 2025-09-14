/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UseMethod from '@/components/drug/detail/UseMethod';

describe('UseMethod Component', () => {
    it('제목이 올바르게 표시된다', () => {
        render(<UseMethod useMethodQesitm="하루 3회, 1정씩 복용" />);
        expect(screen.getByText(/사용 방법/)).toBeInTheDocument();
    });

    it('사용 방법 설명이 표시된다', () => {
        render(<UseMethod useMethodQesitm="하루 3회, 1정씩 복용" />);
        expect(screen.getByText(/하루 3회, 1정씩 복용/)).toBeInTheDocument();
    });

    it('사용 방법이 없으면 빈 <p> 태그만 표시된다', () => {
        render(<UseMethod useMethodQesitm="" />);
        expect(screen.getByText(/사용 방법/)).toBeInTheDocument();
        // 값이 없을 경우에도 <p>는 존재
        expect(screen.getByText('', { selector: 'p' })).toBeInTheDocument();
    });
});
