/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import DetailPharmacyItem from '@/app/pharmacy/[id]/page';

// 하위 컴포넌트 mock
jest.mock('@/components/drug/detail/ImageAndItem', () => (props: any) => (
    <div data-testid="image-and-item">{JSON.stringify(props)}</div>
));
jest.mock('@/components/pharmacy/detail/PharmBasicInfo', () => (props: any) => (
    <div data-testid="pharm-basic-info">{JSON.stringify(props)}</div>
));

describe('DetailPharmacyItem Page', () => {
    it('params.id를 디코딩하여 ImageAndItem과 PharmBasicInfo에 전달한다', async () => {
        const mockPharmacy = {
            yadmNm: '우리약국',
            addr: '서울시 강남구',
            postNo: 12345,
            telno: '02-1234-5678',
        };

        const encodedId = encodeURIComponent(JSON.stringify(mockPharmacy));

        render(
            await DetailPharmacyItem({
                params: Promise.resolve({ id: encodedId }),
            }),
        );

        // ImageAndItem 확인
        expect(screen.getByTestId('image-and-item')).toHaveTextContent('우리약국');

        // PharmBasicInfo 확인
        expect(screen.getByTestId('pharm-basic-info')).toHaveTextContent('서울시 강남구');
        expect(screen.getByTestId('pharm-basic-info')).toHaveTextContent('12345');
        expect(screen.getByTestId('pharm-basic-info')).toHaveTextContent('02-1234-5678');
    });
});
