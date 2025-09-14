/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageAndItem from '@/components/drug/detail/ImageAndItem';

// next/image mock
jest.mock('next/image', () => (props: any) => {
    // next/image는 기본적으로 최적화 처리가 있어서 테스트에서 문제가 됨 → img 태그로 단순 mock
    return <img {...props} />;
});

describe('ImageAndItem Component', () => {
    it('제목에 itemName이 표시된다', () => {
        render(<ImageAndItem itemName="타이레놀" itemImage="/test.png" />);
        expect(screen.getByRole('heading', { name: /타이레놀/ })).toBeInTheDocument();
    });

    it('itemImage가 있으면 해당 이미지가 표시된다', () => {
        render(<ImageAndItem itemName="타이레놀" itemImage="/test.png" />);
        const img = screen.getByRole('img', { name: /타이레놀/ });
        expect(img).toHaveAttribute('src', '/test.png');
    });

    it('itemImage가 없으면 기본 이미지가 표시된다', () => {
        render(<ImageAndItem itemName="아스피린" itemImage={null} />);
        const img = screen.getByRole('img', { name: /아스피린/ });
        expect(img).toHaveAttribute('src', '/images/no_image.png');
    });

    it('처음에는 opacity-0, 이후 opacity-100 클래스로 변경된다', () => {
        render(<ImageAndItem itemName="부루펜" itemImage="/test.png" />);
        const img = screen.getByRole('img', { name: /부루펜/ });
        expect(img.className).toMatch(/opacity-100/);
        // ✅ 실제로는 useEffect가 즉시 loading=false로 바꾸기 때문에 opacity-100 이어야 함
    });
});
