import { render, screen } from '@testing-library/react';
import SearchResultGuide from '@/components/search/SearchResultGuide';

describe('SearchResultGuide', () => {
    it('itemName과 length를 올바르게 출력한다', () => {
        render(<SearchResultGuide itemName="타이레놀" length={5} />);

        // 조각별 검증 (태그 분리 문제 해결)
        expect(screen.getByText('타이레놀')).toBeInTheDocument();
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText(/에 대한 검색 결과/)).toBeInTheDocument();
        expect(screen.getByText(/개/)).toBeInTheDocument();
    });
});
