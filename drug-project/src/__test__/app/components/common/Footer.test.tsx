/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/components/common/Footer';

jest.mock('next/link', () => {
    const MockLink = ({ children, href, ...rest }: any) => (
        <a href={href} {...rest}>
            {children}
        </a>
    );
    MockLink.displayName = 'MockLink';
    return {
        __esModule: true,
        default: MockLink,
    };
});

describe('Footer Component', () => {
    it('제작자 텍스트가 표시된다', () => {
        render(<Footer />);
        expect(screen.getByText(/제작 : @uuizdashdw/)).toBeInTheDocument();
    });

    it('링크가 GitHub 주소를 가리킨다', () => {
        render(<Footer />);
        const link = screen.getByRole('link', { name: /제작 : @uuizdashdw/ });
        expect(link).toHaveAttribute('href', 'https://github.com/uuizdashdw');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
