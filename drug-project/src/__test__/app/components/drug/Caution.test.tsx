/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Caution from '@/components/drug/detail/Caution';

describe('Caution Component', () => {
    it('제목이 올바르게 표시된다', () => {
        render(
            <Caution
                intrcQesitm="다른 약물과의 상호작용 주의"
                seQesitm="간 기능 이상 가능성"
                atpnQesitm="임산부 복용 주의"
            />,
        );
        expect(screen.getByText(/주의 사항/)).toBeInTheDocument();
    });

    it('모든 주의사항 텍스트가 표시된다', () => {
        render(
            <Caution intrcQesitm="상호작용 있음" seQesitm="부작용 있음" atpnQesitm="주의 필요" />,
        );
        expect(screen.getByText(/상호작용 있음/)).toBeInTheDocument();
        expect(screen.getByText(/부작용 있음/)).toBeInTheDocument();
        expect(screen.getByText(/주의 필요/)).toBeInTheDocument();
    });

    it('props가 비어 있어도 구조는 유지된다', () => {
        render(<Caution intrcQesitm="" seQesitm="" atpnQesitm="" />);
        expect(screen.getByText(/주의 사항/)).toBeInTheDocument();

        // <p> 태그 3개가 모두 존재
        const paragraphs = screen.getAllByText('', { selector: 'p' });
        expect(paragraphs).toHaveLength(3);
    });
});
