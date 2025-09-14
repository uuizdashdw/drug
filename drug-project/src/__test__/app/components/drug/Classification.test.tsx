/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Classification from '@/components/drug/detail/Classification';

describe('Classification Component', () => {
    it('제목이 올바르게 표시된다', () => {
        render(<Classification efcyQesitm="진통 효과" />);
        expect(screen.getByText(/사용 구분/)).toBeInTheDocument();
    });

    it('효능/효과 설명이 표시된다', () => {
        render(<Classification efcyQesitm="진통 효과" />);
        expect(screen.getByText(/진통 효과/)).toBeInTheDocument();
    });

    it('효능/효과 설명이 없으면 빈 태그만 표시된다', () => {
        render(<Classification efcyQesitm="" />);
        expect(screen.getByText(/사용 구분/)).toBeInTheDocument();
        // 내용이 비어있더라도 <p>는 존재함
        expect(screen.getByText('', { selector: 'p' })).toBeInTheDocument();
    });
});
