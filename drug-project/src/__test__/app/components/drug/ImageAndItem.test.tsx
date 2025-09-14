/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImageAndItem from '@/components/drug/detail/ImageAndItem';

jest.mock('next/image', () => {
    const MockImage = (props: any) => {
        const { alt, src, ...rest } = props;
        return <img alt={alt ?? 'mock-image'} src={src} {...rest} />;
    };
    MockImage.displayName = 'MockImage';

    return {
        __esModule: true,
        default: MockImage,
    };
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
        // ✅ useEffect가 실행되면서 loading=false → opacity-100이 적용됨
        expect(img.className).toMatch(/opacity-100/);
    });
});
