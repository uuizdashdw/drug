// __tests__/Home.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '@/app/(with-searchbar)/page';
import type { HomeProps } from '@/types/home';

// 🔹 자식 컴포넌트 안전하게 모킹
jest.mock('@/components/drug/DrugListPage', () => {
    const MockDrugListPage = ({ pageNo }: { pageNo: number }) => (
        <div>DrugListPage Mock (pageNo={pageNo})</div>
    );
    MockDrugListPage.displayName = 'DrugListPage'; // 👈 displayName 명시
    return { __esModule: true, default: MockDrugListPage };
});

jest.mock('@/components/search/SearchHistory', () => {
    const MockSearchHistory = () => <div>SearchHistory Mock</div>;
    MockSearchHistory.displayName = 'SearchHistory'; // 👈 displayName 명시
    return { __esModule: true, default: MockSearchHistory };
});

describe('Home (server component)', () => {
    it('SearchHistory와 DrugListPage를 렌더링한다', async () => {
        const searchParams: HomeProps['searchParams'] = Promise.resolve({ page: '2' });

        // Home은 서버 컴포넌트(async function)이므로 await 필요
        const ui = await Home({ searchParams });

        render(ui);

        expect(screen.getByText('SearchHistory Mock')).toBeInTheDocument();
        expect(screen.getByText('DrugListPage Mock (pageNo=2)')).toBeInTheDocument();
    });
});
