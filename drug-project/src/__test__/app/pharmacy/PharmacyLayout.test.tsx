/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import PharmacyLayout from '@/app/pharmacy/layout';

// SearchBar 컴포넌트 mock
jest.mock('@/components/search/SearchBar', () => {
    const Mock = (props: any) => <div data-testid="search-bar">SearchBar type={props.type}</div>;
    Mock.displayName = 'MockSearchBar';
    return Mock;
});

describe('PharmacyLayout', () => {
    it('SearchBar와 children을 렌더링한다', async () => {
        render(await PharmacyLayout({ children: <div>테스트 Child</div> }));

        // SearchBar 확인
        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
        expect(screen.getByText(/type=pharmacy/)).toBeInTheDocument();

        // children 확인
        expect(screen.getByText('테스트 Child')).toBeInTheDocument();
    });
});
