/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManufacturerInfo from '@/components/drug/detail/ManufacturerInfo';

describe('ManufacturerInfo Component', () => {
    it('제조사 정보 제목과 업체명이 렌더링된다', () => {
        render(<ManufacturerInfo entpName="한국제약" bizrNo="123-45-6789" entpSeq="001" />);

        expect(screen.getByText(/제조사 정보/)).toBeInTheDocument();
        expect(screen.getByText(/한국제약/)).toBeInTheDocument();
    });

    it('사업자등록번호가 올바르게 표시된다', () => {
        render(<ManufacturerInfo entpName="테스트제약" bizrNo="987-65-4321" entpSeq="002" />);

        expect(screen.getByText(/테스트제약/)).toBeInTheDocument();
        expect(screen.getByText(/987-65-4321/)).toBeInTheDocument();
    });
});
