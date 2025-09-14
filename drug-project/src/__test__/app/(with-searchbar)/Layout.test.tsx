/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import SearchLayout from '@/app/(with-searchbar)/layout';

// SearchBar 컴포넌트 mock
jest.mock('@/components/search/SearchBar', () => {
    const Mock = (props: any) => <div data-testid="search-bar">SearchBar type={props.type}</div>;
    Mock.displayName = 'MockSearchBar';
    return Mock;
});

describe('SearchLayout', () => {
    it('SearchBar와 children을 렌더링한다', async () => {
        render(await SearchLayout({ children: <div>테스트 Child</div> }));

        // SearchBar 확인
        expect(screen.getByTestId('search-bar')).toBeInTheDocument();
        expect(screen.getByText(/type=drug/)).toBeInTheDocument();

        // children 확인
        expect(screen.getByText('테스트 Child')).toBeInTheDocument();
    });
});
