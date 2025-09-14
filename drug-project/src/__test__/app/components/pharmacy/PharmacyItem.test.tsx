/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PharmacyItem from '@/components/pharmacy/PharmacyItem';
import { PharmacyItem as PharmacyItemType } from '@/types/pharmacy';

// ✅ Next.js Link mock
const MockLink = ({ children, href, ...rest }: any) => (
    <a href={href} {...rest}>
        {children}
    </a>
);
MockLink.displayName = 'MockLink';

jest.mock('next/link', () => ({
    __esModule: true,
    default: MockLink,
}));

// ✅ Next.js Image mock (fill 제거)
const MockImage = (props: any) => {
    const { alt, src, ...rest } = props;
    return <img alt={alt} src={src} {...rest} />;
};
MockImage.displayName = 'MockImage';

jest.mock('next/image', () => ({
    __esModule: true,
    default: MockImage,
}));

// ✅ Zustand store mock
const addItemMock = jest.fn();
jest.mock('@/store/zustand/searchKeyword', () => ({
    useSearchStore: () => ({ addItem: addItemMock }),
}));

describe('PharmacyItem Component', () => {
    const mockPharmacy: PharmacyItemType = {
        addr: '서울시 강남구 테헤란로 1',
        clCd: 11,
        clCdNm: '약국',
        emdongNm: '역삼동',
        estbDd: 20200101,
        postNo: 12345,
        sgguCd: 101,
        sgguCdNm: '강남구',
        sidoCd: 11,
        sidoCdNm: '서울특별시',
        telno: '02-123-4567',
        XPos: 127.0276,
        YPos: 37.4979,
        yadmNm: '우리약국',
        ykiho: 'ENC001',
    };

    it('약국 이름이 화면에 표시된다', async () => {
        render(<PharmacyItem item={mockPharmacy} />);
        expect(await screen.findByText(/우리약국/)).toBeInTheDocument();
    });

    it('이미지가 약국 이름을 alt로 가진다', () => {
        render(<PharmacyItem item={mockPharmacy} />);
        expect(screen.getByAltText(/우리약국/)).toBeInTheDocument();
    });

    it('클릭 시 addItem이 호출된다', () => {
        render(<PharmacyItem item={mockPharmacy} />);
        const link = screen.getByRole('link', { name: /우리약국/ });
        fireEvent.click(link);

        expect(addItemMock).toHaveBeenCalledWith(
            expect.objectContaining({ yadmNm: '우리약국', type: 'pharmacy' }),
        );
    });
});
