/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BasicInfo from '@/components/drug/detail/BasicInfo';
import { transformDateYYYYMMDD } from '@/utils/transformDate';

// 유틸 함수 모킹
jest.mock('@/utils/transformDate', () => ({
    transformDateYYYYMMDD: jest.fn(),
}));

describe('BasicInfo Component', () => {
    it('props로 전달된 값이 올바르게 렌더링된다', () => {
        (transformDateYYYYMMDD as jest.Mock).mockReturnValue('2009-06-04');

        render(
            <BasicInfo
                itemName="타이레놀"
                efcyQesitm="두통 완화"
                itemSeq="12345"
                openDe="20090604"
            />,
        );

        expect(screen.getByText(/기본 정보/)).toBeInTheDocument();
        expect(screen.getByText(/타이레놀/)).toBeInTheDocument();
        expect(screen.getByText(/두통 완화/)).toBeInTheDocument();
        expect(screen.getByText(/12345/)).toBeInTheDocument();
        expect(screen.getByText(/2009-06-04/)).toBeInTheDocument();
    });

    it('허가일자가 없으면 transformDateYYYYMMDD가 빈 값으로 처리된다', () => {
        (transformDateYYYYMMDD as jest.Mock).mockReturnValue('');

        render(
            <BasicInfo
                itemName="아스피린"
                efcyQesitm="혈액 응고 방지"
                itemSeq="67890"
                openDe={''}
            />,
        );

        expect(screen.getByText(/아스피린/)).toBeInTheDocument();
        expect(screen.getByText(/혈액 응고 방지/)).toBeInTheDocument();
        expect(screen.getByText(/67890/)).toBeInTheDocument();
        // 허가일자 부분이 비어 있음
        expect(screen.getByText(/허가일자 :/)).toBeInTheDocument();
    });
});
