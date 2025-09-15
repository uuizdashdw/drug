// Components
import PharmacyListPage from '@/components/pharmacy/PharmacyListPage';
import SearchHistroy from '@/components/search/SearchHistory';

// Types
import { PharmacyPageProps } from '@/types/pharmacy';

export default async function PharmacyPage({ searchParams }: PharmacyPageProps) {
    const param = await searchParams;
    const pageNo = Number(param?.page ?? '1');

    return (
        <>
            <SearchHistroy />

            <PharmacyListPage pageNo={pageNo} />
        </>
    );
}
