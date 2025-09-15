// Components
import DrugListPage from '@/components/drug/DrugListPage';
import SearchHistroy from '@/components/search/SearchHistory';

// Types
import { HomeProps } from '@/types/home';

export default function Home({ searchParams }: HomeProps) {
    const params = searchParams;
    const pageNo = Number(params?.page ?? 1);

    return (
        <>
            <SearchHistroy />

            <DrugListPage pageNo={pageNo} />
        </>
    );
}
