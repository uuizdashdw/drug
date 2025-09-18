// Components
import SearchHistroy from '@/components/search/SearchHistory';
import SearchPharmacyList from '@/components/search/SearchPharmacyList';

// Types
import { SearchPharmacyPageProps } from '@/types/search';

export default async function PharmacySearchPage({ searchParams }: SearchPharmacyPageProps) {
    const param = await searchParams;
    const keyword = param?.q;
    const pageNo = Number(param?.pageNo ?? 1);

    return (
        <div className="container">
            <SearchHistroy />

            <SearchPharmacyList itemName={keyword} pageNo={pageNo} />
        </div>
    );
}
