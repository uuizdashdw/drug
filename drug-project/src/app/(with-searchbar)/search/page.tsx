// Components
import SearchDrugList from '@/components/search/SearchDrugList';
import SearchHistroy from '@/components/search/SearchHistory';

// Types
import { SearchPageProps } from '@/types/search';

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const param = await searchParams;
    const itemName = param?.q ?? '';
    const pageNo = Number(param?.page ?? '1');

    return (
        <div className="container">
            <SearchHistroy />

            <SearchDrugList itemName={itemName} pageNo={pageNo} />
        </div>
    );
}
