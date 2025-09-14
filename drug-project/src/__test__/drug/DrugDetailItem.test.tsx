/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// 테스트 대상
import DrugDetailItem from '@/app/drug/[id]/page';

// API 모듈 mocking
jest.mock('@/api/drugs', () => ({
    getMedicineList: jest.fn(),
}));

import { getMedicineList } from '@/api/drugs';

describe('DrugDetailItem Page', () => {
    it('약물 데이터를 찾지 못했을 때 메시지를 표시한다', async () => {
        (getMedicineList as jest.Mock).mockResolvedValueOnce({
            body: { items: [] },
        });

        render(await DrugDetailItem({ params: { id: '12345' } }));

        expect(await screen.findByText(/데이터를 찾을 수 없습니다./)).toBeInTheDocument();
    });

    it('약물 데이터를 불러오면 기본 정보가 렌더링된다', async () => {
        (getMedicineList as jest.Mock).mockResolvedValueOnce({
            body: {
                items: [
                    {
                        itemSeq: '12345',
                        itemName: '테스트약',
                        itemImage: '/test.png',
                        efcyQesitm: '효능 설명',
                        entpName: '테스트제약',
                        bizrno: '123-45-6789',
                        useMethodQesitm: '하루 두 번 복용',
                        updateDe: '2025-09-14',
                    },
                ],
            },
        });

        render(await DrugDetailItem({ params: { id: '12345' } }));

        // 이미지/이름
        expect(await screen.findByRole('heading', { name: /테스트약/ })).toBeInTheDocument();

        // 제조사 정보
        expect(await screen.findByText(/테스트제약/)).toBeInTheDocument();

        // 마지막 업데이트 날짜
        expect(await screen.findByText(/2025-09-14/)).toBeInTheDocument();
    });
});
